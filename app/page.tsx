import { Task1Form } from "@/components/Task1Form";
import { Task2Form } from "@/components/Task2Form";
import { Task3Form } from "@/components/Task3Form";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 py-8 ">
      {/* <Task1Form /> */}
      {/* <Task2Form /> */}
      <Task3Form />
    </main>
  );
}
