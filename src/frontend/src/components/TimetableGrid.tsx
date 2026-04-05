import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { TimetableSlot } from "../hooks/useTimetable";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface TimetableGridProps {
  slots: TimetableSlot[];
  onAdd: (slot: Omit<TimetableSlot, "id" | "color">) => void;
  onDelete: (id: string) => void;
}

export function TimetableGrid({ slots, onAdd, onDelete }: TimetableGridProps) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    day: "Monday",
    startTime: "09:00",
    endTime: "10:30",
    subject: "",
    room: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim()) return;
    onAdd(form);
    setForm({
      day: "Monday",
      startTime: "09:00",
      endTime: "10:30",
      subject: "",
      room: "",
    });
    setShowForm(false);
  };

  const slotsByDay = DAYS.reduce<Record<string, TimetableSlot[]>>(
    (acc, day) => {
      acc[day] = slots.filter((s) => s.day === day);
      return acc;
    },
    {},
  );

  const workDays = DAYS.filter(
    (d) =>
      slotsByDay[d].length > 0 ||
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(d),
  );

  return (
    <div className="space-y-4" data-ocid="timetable.panel">
      {/* Weekly grid */}
      <div className="overflow-x-auto">
        <div
          className="min-w-[500px] grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${Math.min(workDays.length, 5)}, 1fr)`,
          }}
        >
          {workDays.slice(0, 5).map((day) => (
            <div key={day} className="space-y-2">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide text-center pb-1 border-b border-border">
                {day.slice(0, 3)}
              </div>
              <div className="space-y-1 min-h-[60px]">
                {slotsByDay[day].length === 0 && (
                  <div className="text-[10px] text-muted-foreground/50 text-center pt-2">
                    Free
                  </div>
                )}
                {slotsByDay[day].map((slot, idx) => (
                  <div
                    key={slot.id}
                    className="group relative rounded-md p-2 text-white text-[10px] leading-tight cursor-default"
                    style={{ background: slot.color }}
                    data-ocid={`timetable.item.${idx + 1}`}
                  >
                    <p className="font-semibold truncate">{slot.subject}</p>
                    <p className="opacity-80">
                      {slot.startTime} &ndash; {slot.endTime}
                    </p>
                    {slot.room && <p className="opacity-70">{slot.room}</p>}
                    <button
                      type="button"
                      onClick={() => onDelete(slot.id)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded p-0.5"
                      aria-label="Delete slot"
                      data-ocid="timetable.delete_button"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add form */}
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 pt-3 border-t border-border"
          data-ocid="timetable.modal"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Day</Label>
              <Select
                value={form.day}
                onValueChange={(v) => setForm((p) => ({ ...p, day: v }))}
              >
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="timetable.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((d) => (
                    <SelectItem key={d} value={d} className="text-xs">
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Subject *</Label>
              <Input
                className="h-8 text-xs"
                placeholder="Subject name"
                value={form.subject}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subject: e.target.value }))
                }
                data-ocid="timetable.input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Start Time</Label>
              <Input
                type="time"
                className="h-8 text-xs"
                value={form.startTime}
                onChange={(e) =>
                  setForm((p) => ({ ...p, startTime: e.target.value }))
                }
                data-ocid="timetable.input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">End Time</Label>
              <Input
                type="time"
                className="h-8 text-xs"
                value={form.endTime}
                onChange={(e) =>
                  setForm((p) => ({ ...p, endTime: e.target.value }))
                }
                data-ocid="timetable.input"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label className="text-xs">Room (optional)</Label>
              <Input
                className="h-8 text-xs"
                placeholder="e.g. LH-101"
                value={form.room}
                onChange={(e) =>
                  setForm((p) => ({ ...p, room: e.target.value }))
                }
                data-ocid="timetable.input"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              size="sm"
              className="flex-1"
              data-ocid="timetable.submit_button"
            >
              Add Slot
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowForm(false)}
              data-ocid="timetable.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-dashed border-primary/40 text-primary hover:bg-primary/5"
          onClick={() => setShowForm(true)}
          data-ocid="timetable.open_modal_button"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          Add Slot
        </Button>
      )}
    </div>
  );
}
