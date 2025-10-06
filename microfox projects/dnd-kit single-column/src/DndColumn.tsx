import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Item = {
  id: string;
  label: string;
};

const defaultItems: Item[] = [
  { id: "task-1", label: "Organize a team-building event" },
  { id: "task-2", label: "Create and maintain office inventory" },
  { id: "task-3", label: "Update company website content" },
  { id: "task-4", label: "Plan and execute marketing campaigns" },
  { id: "task-5", label: "Conduct employee performance reviews" },
  { id: "task-6", label: "Coordinate with external vendors" },
  { id: "task-7", label: "Manage social media accounts" },
  { id: "task-8", label: "Prepare financial reports" },
];

const DndColumn = () => {
  const [items, setItems] = useState(defaultItems);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: any) {
    const { active, over } = event;

    console.log("Drag event:", { active: active?.id, over: over?.id });

    if (active.id !== over?.id && over) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        console.log(`Moving from ${oldIndex} to ${newIndex}`);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="droppable-container">
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} label={item.label} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

function SortableItem({ id, label }: { id: string; label: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card ${isDragging ? "dragging" : ""}`}
    >
      {label}
    </div>
  );
}
export default DndColumn;
