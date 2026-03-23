import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="w-16 h-16 text-primary/40" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">页面寻不见</h1>
        <p className="text-muted-foreground mb-8">
          抱歉，您访问的数字展厅或页面不存在。也许您可以回到首页继续探索孝感非遗文化。
        </p>
        <Link href="/">
          <span className="inline-flex px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all cursor-pointer">
            返回数字展厅首页
          </span>
        </Link>
      </div>
    </div>
  );
}
