import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";

const steps = [{ label: "Step 1" }, { label: "Step 2" }];

export const InvestSteps = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;
  const bg = useColorModeValue("gray.200", "gray.700");
  return (
    
    <Flex flexDir="column" width="100%">
      <Steps variant="circles" colorScheme="pink" activeStep={activeStep}>
        {/* {steps.map(({ label }, index) => ( */}
          <Step key="Step 1">
            <Box sx={{ p: 8, bg, my: 8, rounded: "md" }}>
              <Heading fontSize="xl" textAlign="center">
                Step 1
              </Heading>
            </Box>
        </Step>
        <Step key="Step 2">
            <Box sx={{ p: 8, bg, my: 8, rounded: "md" }}>
              <Heading fontSize="xl" textAlign="center">
               <Button
              isDisabled={activeStep === 0}
              onClick={prevStep}
              
             width={'100%'} colorScheme='pink' variant={"solid"}
            >
              Prev
            </Button>
              </Heading>
            </Box>
          </Step>
        {/* ))} */}
      </Steps>
      {hasCompletedAllSteps && (
        <Box sx={{ bg, my: 8, p: 8, rounded: "md" }}>
          <Heading fontSize="xl" textAlign={"center"}>
            Woohoo! All steps completed! 🎉
          </Heading>
        </Box>
      )}
      <Flex width="100%" justify="flex-end" gap={4}>
        {hasCompletedAllSteps ? (
          <Button width={'100%'} colorScheme='pink' variant={"solid"} onClick={reset}>
            Start Over
          </Button>
        ) : (
          <>
            {/* <Button
              isDisabled={activeStep === 0}
              onClick={prevStep}
              size="sm"
             width={'100%'} colorScheme='pink' variant={"solid"}
            >
              Prev
            </Button> */}
            <Button  width={'100%'} colorScheme='pink' variant={"solid"} onClick={nextStep}>
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};