import { BentoGrid } from "../BentoGrid";
import { projects } from "@/constants";

export default function BentoGridExample() {
  return (
    <div className="bg-background p-8">
      <BentoGrid projects={projects} />
    </div>
  );
}
