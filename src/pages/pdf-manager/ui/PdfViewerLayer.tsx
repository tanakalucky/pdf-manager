import { ArrowLeft } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button";

interface Props {
  name: string;
  src: string;
  isVisible: boolean;
  onBack: () => void;
}

export const PdfViewerLayer = ({ name, src, isVisible, onBack }: Props) => {
  return (
    <div className={cn("fixed inset-0 z-10 flex-col bg-background", isVisible ? "flex" : "hidden")}>
      <div className="flex flex-none items-center gap-3 border-b-2 border-divider px-4 py-3">
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft className="size-4" aria-hidden />
          一覧に戻る
        </Button>

        <span className="truncate font-heading text-sm font-extrabold">{name}</span>
      </div>

      {/* src を書き換えず再生成もしないことで、PDF を切り替えてもスクロール位置が保たれる */}
      <iframe src={src} title={name} className="w-full flex-1 border-0" />
    </div>
  );
};
