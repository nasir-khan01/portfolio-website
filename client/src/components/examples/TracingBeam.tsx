import { TracingBeam } from "../TracingBeam";
import { timeline } from "@/constants";

export default function TracingBeamExample() {
  return (
    <div className="bg-background p-8 max-w-2xl">
      <TracingBeam events={timeline} />
    </div>
  );
}
