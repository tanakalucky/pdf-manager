import { Trash2 } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/shared/ui/Button";

interface Props {
  count: number;
  onConfirm: () => void;
}

export const DeleteAllButton = ({ count, onConfirm }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleConfirm = () => {
    onConfirm();
    dialogRef.current?.close();
  };

  return (
    <>
      <Button
        variant="secondary"
        disabled={count === 0}
        onClick={() => dialogRef.current?.showModal()}
      >
        <Trash2 className="size-4" aria-hidden />
        全て削除
      </Button>

      {/* 取り消せない操作のため、ネイティブの modal dialog で確認を挟む */}
      <dialog
        ref={dialogRef}
        className="m-auto w-full max-w-110 rounded-card bg-surface p-4 text-foreground shadow-lg backdrop:bg-neutral-900/50"
      >
        <h2 className="text-xl">アップロードした PDF を全て削除しますか？</h2>

        <p className="mt-3 text-sm text-foreground/85">
          {count} 件の PDF がこのブラウザから削除されます。この操作は取り消せません。
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => dialogRef.current?.close()}>
            キャンセル
          </Button>

          <Button onClick={handleConfirm}>削除する</Button>
        </div>
      </dialog>
    </>
  );
};
