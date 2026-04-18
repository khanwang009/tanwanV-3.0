import { Question } from "@/data/db";
import GenericChoiceRenderer from "./GenericChoiceRenderer";
import CubeRenderer from "./CubeRenderer";
import CubeMeshRenderer from "./CubeMeshRenderer";
import FractionRenderer from "./FractionRenderer";
import ChartRenderer from "./ChartRenderer";
import BalanceRenderer from "./BalanceRenderer";
import WaterCubeRenderer from "./WaterCubeRenderer";
import NumberRenderer from "./NumberRenderer";
import RotateRenderer from "./RotateRenderer";

interface RendererRouterProps {
  question: Question;
  onAnswer?: (answer: string) => void;
}

export default function RendererRouter({ question, onAnswer }: RendererRouterProps) {
  switch (question.sceneType) {
    case "cube":
      return <CubeRenderer question={question} />;
    case "cube_mesh":
      return <CubeMeshRenderer question={question} />;
    case "water_cube":
      return <WaterCubeRenderer question={question} />;
    case "fraction":
      return <FractionRenderer question={question} />;
    case "chart":
      return <ChartRenderer question={question} />;
    case "balance":
      return <BalanceRenderer question={question} />;
    case "number":
      return <NumberRenderer question={question} />;
    case "rotate":
      return <RotateRenderer question={question} />;
    case "generic":
    default:
      return <GenericChoiceRenderer question={question} onAnswer={onAnswer} />;
  }
}
