import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Subject } from "../hooks/useSubjects";
import { getGradeColor } from "../utils/gpa";
import { AddSubjectForm } from "./AddSubjectForm";

interface SubjectTableProps {
  subjects: Subject[];
  onUpdate: (
    id: string,
    data: Omit<Subject, "id" | "percentage" | "grade" | "gradePoints">,
  ) => void;
  onDelete: (id: string) => void;
}

export function SubjectTable({
  subjects,
  onUpdate,
  onDelete,
}: SubjectTableProps) {
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div data-ocid="subjects.table">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold text-foreground">
                Subject
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Code
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Semester
              </TableHead>
              <TableHead className="font-semibold text-foreground text-right">
                Marks
              </TableHead>
              <TableHead className="font-semibold text-foreground text-right">
                %
              </TableHead>
              <TableHead className="font-semibold text-foreground text-center">
                Grade
              </TableHead>
              <TableHead className="font-semibold text-foreground text-right">
                Credits
              </TableHead>
              <TableHead className="font-semibold text-foreground text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject, idx) => (
              <TableRow
                key={subject.id}
                className="hover:bg-muted/30 transition-colors"
                data-ocid={`subjects.item.${idx + 1}`}
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {subject.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {subject.instructor}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground font-mono">
                  {subject.code}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {subject.semester}
                </TableCell>
                <TableCell className="text-sm text-right">
                  {subject.marksObtained}/{subject.totalMarks}
                </TableCell>
                <TableCell className="text-sm text-right font-medium">
                  {subject.percentage.toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={`text-xs font-semibold ${getGradeColor(subject.grade)}`}
                    variant="outline"
                  >
                    {subject.grade}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-right">
                  {subject.credits}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Dialog
                      open={editOpen && editingSubject?.id === subject.id}
                      onOpenChange={(open) => {
                        setEditOpen(open);
                        if (!open) setEditingSubject(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingSubject(subject);
                            setEditOpen(true);
                          }}
                          className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                          data-ocid={`subjects.edit_button.${idx + 1}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl">
                        <DialogHeader>
                          <DialogTitle>Edit Subject</DialogTitle>
                        </DialogHeader>
                        {editingSubject && (
                          <AddSubjectForm
                            initialData={editingSubject}
                            onSubmit={(data) => {
                              onUpdate(editingSubject.id, data);
                              setEditOpen(false);
                              setEditingSubject(null);
                            }}
                            onCancel={() => {
                              setEditOpen(false);
                              setEditingSubject(null);
                            }}
                          />
                        )}
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                          data-ocid={`subjects.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent data-ocid="subjects.dialog">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Subject?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove{" "}
                            <strong>{subject.name}</strong> from your records.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel data-ocid="subjects.cancel_button">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(subject.id)}
                            className="bg-destructive hover:bg-destructive/90"
                            data-ocid="subjects.confirm_button"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {subjects.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-12 text-muted-foreground"
                  data-ocid="subjects.empty_state"
                >
                  No subjects added yet. Add your first subject to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
