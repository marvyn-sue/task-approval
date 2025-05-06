import { Card } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AddTaskModal from "@/features/dashboard/AddTaskModal";
import ContextTaskFormProvider from "@/features/dashboard/ContextTaskForm";

import TaskTable from "@/features/dashboard/TaskTable";

export default function Home() {
  return (
    <ContextTaskFormProvider>
      <div className="flex justify-between">
        <SidebarTrigger className="-ml-1" />
        <AddTaskModal />
      </div>
      <Card className="@container/card py-0">
        <TaskTable />
      </Card>
    </ContextTaskFormProvider>
  );
}
