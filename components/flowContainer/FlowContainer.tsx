'use client';

import { Flow } from '@/__flows/_flow';
import { INPUT_TYPES_WITH_CONTINUE_BUTTON, type PendingSubmitAnswer } from '@/__flows/_flowNode';
import { useScrollShadows } from '@/__hooks/useScrollShadows';
import { useCssAnimationStore } from '@/__store/cssAnimationsStore';
import { FlowInstances, useFlowsStore } from '@/__store/flowsStore';
import { Cloud } from '@/assets/images/Cloud';
import { InputContainer } from '@/components/flowContainer/inputContainer/InputContainer';
import Floro, { FloroRiveState } from '@/components/rive/floro';
import { Button } from '@/components/ui/button';
import { ScrollShadow } from '@/components/ui/scrollShadow';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import { MessageKeys, NamespaceKeys, useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PendingFlowDialog } from './pendingFlowDialog/PendingFlowDialog';

type FlowContainerProps<T> = {
  flowName: keyof FlowInstances;
  onGoHome?: () => void;
  onEnd?: (data: T) => void;
};

export const FlowContainer = <T,>({ flowName, onEnd, onGoHome }: FlowContainerProps<T>) => {
  const { flows, setCurrentNodeId, updateData, reset, getData, start } = useFlowsStore();
  const [isPendingFlowDialogOpen, setIsPendingFlowDialogOpen] = useState(false);
  const [pendingMultiAnswer, setPendingMultiAnswer] = useState<Record<string, unknown> | null>(
    null
  );
  const [pendingSubmitAnswer, setPendingSubmitAnswer] = useState<PendingSubmitAnswer>(null);
  const [shouldReplayRive, setShouldReplayRive] = useState(false);
  const flow = flows[flowName].flow;
  const currentNodeId = flows[flowName].currentNodeId;
  const currentNode = currentNodeId ? flow.steps[currentNodeId] : null;
  const isScrollableArea = currentNode?.inputType !== 'coordinates';
  const { scrollRef, showTopShadow, showBottomShadow } = useScrollShadows(isScrollableArea);

  const resetPending = useCallback(() => {
    setPendingMultiAnswer(null);
    setPendingSubmitAnswer(null);
  }, []);

  const tFlow = useTranslations(
    flows[flowName].flow.translations as NamespaceKeys<IntlMessages, 'flows'>
  );
  const tShared = useTranslations('flows.shared');
  const { setComponentState } = useCssAnimationStore();

  useEffect(() => {
    start(flowName, (wasAlreadyStarted) => {
      if (wasAlreadyStarted) {
        setIsPendingFlowDialogOpen(true);
      }
    });
  }, [flowName, start]);

  useEffect(() => {
    resetPending();
  }, [currentNodeId, resetPending]);

  const handleAnswer = (answer: any) => {
    if (!currentNode) {
      console.error('No current node found');
      return;
    }

    try {
      const schema = currentNode.schema;
      if (schema) {
        const validationResult = schema.safeParse(answer);
        if (!validationResult.success) {
          const errorMessage = validationResult.error.errors.map((e) => e.message).join(', ');
          toast.error(errorMessage);
          return;
        }
        answer = validationResult.data;
      }
      updateData(flowName, answer);
      const nextKey = currentNode?.next(getData(flowName)) as keyof typeof flow.steps | null;
      if (nextKey && flow.steps[nextKey]) {
        setCurrentNodeId(flowName, nextKey);
      } else if (nextKey === 'end') {
        onEnd?.(getData(flowName) as T);
      }
      if (currentNode?.cssAnimations) {
        currentNode.cssAnimations.forEach((cssAnimation) => {
          setComponentState(cssAnimation.component, cssAnimation.state);
        });
      }
    } catch (error) {
      console.error('Error processing answer:', error);
    }
  };

  if (!currentNode) {
    return null;
  }

  const hasContinueButton = INPUT_TYPES_WITH_CONTINUE_BUTTON.includes(currentNode.inputType);
  const isMultiSelectNode = currentNode.inputType === 'buttonMultiSelect';

  const canSubmitMulti =
    isMultiSelectNode &&
    Boolean(pendingMultiAnswer) &&
    (!currentNode.schema || currentNode.schema.safeParse(pendingMultiAnswer).success);

  const canSubmitSingle = !isMultiSelectNode && Boolean(pendingSubmitAnswer?.valid);

  const canContinue = isMultiSelectNode ? canSubmitMulti : canSubmitSingle;

  const answerToSubmit = isMultiSelectNode
    ? pendingMultiAnswer
    : pendingSubmitAnswer?.valid
      ? pendingSubmitAnswer.value
      : null;

  const handleContinue = useCallback(() => {
    if (answerToSubmit) handleAnswer(answerToSubmit);
  }, [answerToSubmit]);

  const setPendingMultiAnswerCallback = useCallback(
    (answer: any) => setPendingMultiAnswer(answer),
    []
  );

  const setPendingSubmitAnswerCallback = useCallback(
    (value: Record<string, unknown> | null, valid: boolean) => {
      setPendingSubmitAnswer(value !== null ? { value, valid } : null);
    },
    []
  );

  const continueLabel = isMultiSelectNode
    ? (tFlow(
        `node-specific.${currentNode.id}.submit` as MessageKeys<IntlMessages, 'flows'>
      ) as string)
    : tShared('submit');

  return (
    <div className="flex flex-col h-full w-full sm:max-w-[500px] items-center justify-start z-10">
      <div className="flex flex-col w-full justify-start items-center mt-[80px]">
        <div className="w-full max-h-[360px] md:h-[316px] overflow-hidden relative">
          <Cloud className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-12 z-0" />
          <Floro
            flowName={flowName}
            state={
              (currentNode?.riveState?.(getData(flowName) as Flow) || 'idle') as FloroRiveState
            }
            navigation={true}
            onGoHome={onGoHome} // TODO: remove this
            replayFromHistory={shouldReplayRive}
            onReplayComplete={() => setShouldReplayRive(false)}
          />
        </div>
        <div className="backdrop-blur-md min-h-20 max-w-[400px] p-6 z-30 -mt-[24px] mx-4 hover:scale-110 transition-transform duration-300 ease-in-out text-center items-center justify-center flex shadow-[0_4px_13px_rgba(0,0,0,0.15)] rounded-full bg-background/70 text-md font-bold text-lg">
          {currentNode &&
            tFlow(`questions.${currentNode?.id}` as MessageKeys<IntlMessages, 'flows'>)}
        </div>
      </div>

      <div className="relative w-full bg-background min-h-[5.5rem] max-h-[8rem] mt-3 overflow-hidden">
        <ScrollShadow position="top" visible={showTopShadow} />
        <ScrollShadow position="bottom" visible={showBottomShadow} />

        {/* scrollable content */}
        <div
          ref={scrollRef}
          className={clsx('h-full py-1.5 px-3 pt-3', {
            'overflow-y-auto scrollbar-hide': currentNode.inputType !== 'coordinates'
          })}
        >
          {currentNode && (
            <InputContainer
              node={currentNode}
              onAnswerAction={
                currentNode.inputType === 'buttonMultiSelect'
                  ? setPendingMultiAnswerCallback
                  : handleAnswer
              }
              onPendingSubmitChange={setPendingSubmitAnswerCallback}
              flowTranslations={flow.translations}
            />
          )}
        </div>
      </div>
      {hasContinueButton && (
        <div className="w-full flex justify-end px-4 mt-4">
          <Button
            variant="ghost"
            onClick={handleContinue}
            disabled={!canContinue}
            className="fixed bottom-4 right-4 md:static rounded-full"
          >
            {continueLabel}
            <Check className="w-5 h-5 ml-2" width={20} height={20} strokeWidth={3} />
          </Button>
        </div>
      )}
      <PendingFlowDialog
        flowTranslations={flow.translations as NamespaceKeys<IntlMessages, 'flows'>}
        onStartAction={() => {
          setShouldReplayRive(true);
          setIsPendingFlowDialogOpen(false);
        }}
        onResetAction={() => {
          reset(flowName);
          resetPending();
          setIsPendingFlowDialogOpen(false);
        }}
        open={isPendingFlowDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsPendingFlowDialogOpen(false);
          }
        }}
        onClose={() => setIsPendingFlowDialogOpen(false)}
      />
    </div>
  );
};
