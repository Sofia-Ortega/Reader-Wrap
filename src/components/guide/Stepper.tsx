interface Props {
  step: number;
}
export default function Stepper({ step }: Props) {
  return <div>Step: {step}</div>;
}
