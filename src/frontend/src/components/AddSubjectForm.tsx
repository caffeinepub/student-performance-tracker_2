import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { Subject } from "../hooks/useSubjects";

type SubjectFormData = Omit<
  Subject,
  "id" | "percentage" | "grade" | "gradePoints"
>;

interface AddSubjectFormProps {
  initialData?: Partial<SubjectFormData>;
  onSubmit: (data: SubjectFormData) => void;
  onCancel?: () => void;
}

export function AddSubjectForm({
  initialData,
  onSubmit,
  onCancel,
}: AddSubjectFormProps) {
  const [form, setForm] = useState<SubjectFormData>({
    name: initialData?.name || "",
    code: initialData?.code || "",
    credits: initialData?.credits || 3,
    marksObtained: initialData?.marksObtained || 0,
    totalMarks: initialData?.totalMarks || 100,
    semester: initialData?.semester || "",
    instructor: initialData?.instructor || "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SubjectFormData, string>>
  >({});

  const validate = () => {
    const errs: Partial<Record<keyof SubjectFormData, string>> = {};
    if (!form.name.trim()) errs.name = "Subject name is required";
    if (!form.code.trim()) errs.code = "Subject code is required";
    if (form.credits < 1 || form.credits > 6)
      errs.credits = "Credits must be 1-6";
    if (form.marksObtained < 0) errs.marksObtained = "Cannot be negative";
    if (form.totalMarks < 1) errs.totalMarks = "Total marks must be at least 1";
    if (form.marksObtained > form.totalMarks)
      errs.marksObtained = "Cannot exceed total marks";
    if (!form.semester.trim()) errs.semester = "Semester is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  };

  const field = (key: keyof SubjectFormData) => ({
    value: String(form[key]),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({
        ...prev,
        [key]: ["credits", "marksObtained", "totalMarks"].includes(key)
          ? Number(e.target.value)
          : e.target.value,
      })),
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="subjects.modal"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-1">
          <Label htmlFor="name">Subject Name *</Label>
          <Input
            id="name"
            placeholder="e.g. Data Structures"
            {...field("name")}
            data-ocid="subjects.input"
          />
          {errors.name && (
            <p
              className="text-xs text-destructive"
              data-ocid="subjects.error_state"
            >
              {errors.name}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="code">Code *</Label>
          <Input
            id="code"
            placeholder="e.g. CS-301"
            {...field("code")}
            data-ocid="subjects.input"
          />
          {errors.code && (
            <p className="text-xs text-destructive">{errors.code}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="credits">Credits *</Label>
          <Input
            id="credits"
            type="number"
            min={1}
            max={6}
            {...field("credits")}
            data-ocid="subjects.input"
          />
          {errors.credits && (
            <p className="text-xs text-destructive">{errors.credits}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="marks">Marks Obtained *</Label>
          <Input
            id="marks"
            type="number"
            min={0}
            {...field("marksObtained")}
            data-ocid="subjects.input"
          />
          {errors.marksObtained && (
            <p className="text-xs text-destructive">{errors.marksObtained}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="total">Total Marks *</Label>
          <Input
            id="total"
            type="number"
            min={1}
            {...field("totalMarks")}
            data-ocid="subjects.input"
          />
          {errors.totalMarks && (
            <p className="text-xs text-destructive">{errors.totalMarks}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="semester">Semester *</Label>
          <Input
            id="semester"
            placeholder="e.g. Fall 2024"
            {...field("semester")}
            data-ocid="subjects.input"
          />
          {errors.semester && (
            <p className="text-xs text-destructive">{errors.semester}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            placeholder="Instructor name"
            {...field("instructor")}
            data-ocid="subjects.input"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          className="flex-1"
          data-ocid="subjects.submit_button"
        >
          {initialData?.name ? "Update Subject" : "Add Subject"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            data-ocid="subjects.cancel_button"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
