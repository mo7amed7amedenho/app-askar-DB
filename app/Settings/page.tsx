"use client";
import { Button, Input, Alert, Skeleton, Divider } from "@heroui/react"; // تأكد من توفر Alert و Skeleton في مكتبتك
import { FaPen } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeSwitcher from "@/components/blocks/ThemeSwitcher";
import { LogoutButton } from "@/components/blocks";

export default function Page() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  // حالة تخزين بيانات النموذج مع الحقول اللازمة
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // حالة التنبيه (Alert)؛ نستخدم هنا القيم المدعومة "success" و "danger"
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  // حالة الانتظار أثناء عملية التحديث
  const [isSubmitting, setIsSubmitting] = useState(false);

  // عند تحميل بيانات الجلسة نقوم بملء بيانات النموذج تلقائيًا
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role || "مستخدم مجهول",
      }));
    }
  }, [session]);

  // التعامل مع تغييرات المدخلات
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // عند الضغط على زر التحديث أو تقديم النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    // شرط أساسي: يجب إدخال كلمة المرور الحالية دائمًا للتحقق
    if (!formData.currentPassword) {
      setAlert({ type: "danger", message: "يجب إدخال كلمة المرور الحالية." });
      return;
    }

    // إذا قام المستخدم بإدخال كلمة المرور الجديدة، فهذا يعني أنه يرغب بتحديث كلمة المرور
    if (formData.newPassword) {
      if (!formData.confirmPassword) {
        setAlert({ type: "danger", message: "يجب تأكيد كلمة المرور الجديدة." });
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setAlert({
          type: "danger",
          message: "كلمة المرور الجديدة وتأكيدها غير متطابقين.",
        });
        return;
      }
    }

    setIsSubmitting(true);

    // تجهيز البيانات التي سيتم إرسالها إلى الخادم
    // نرسل دائمًا: الاسم، البريد الإلكتروني، الوظيفة، وكلمة المرور الحالية
    // وفي حالة تحديث كلمة المرور نرسل كلمة المرور الجديدة
    const body = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword || null,
    };

    try {
      const res = await fetch(`/api/register/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setAlert({ type: "success", message: " تم تحديث البيانات بنجاح!" });
      } else {
        setAlert({ type: "danger", message: ` خطأ: ${data.error}` });
      }
    } catch (error) {
      setAlert({ type: "danger", message: " حدث خطأ أثناء تحديث البيانات." });
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("ID being sent:", formData.id);

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-zinc-950 p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        الإعدادات
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        يمكنك تغيير بياناتك الرئيسية وكلمة المرور من هنا. لإجراء التعديل، يجب
        إدخال كلمة المرور الحالية. إذا كنت ترغب في تغيير كلمة المرور أيضًا، قم
        بإدخال كلمة المرور الجديدة وتأكيدها.
      </p>
      <div className="flex items-center justify-center mb-6">
        <Divider />
        <p className="text-gray-800 dark:text-gray-300 text-nowrap px-2">
          تعديل البيانات الرئيسية
        </p>
        <Divider />
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 w-full">
        {/* القسم الخاص بالحقول الأساسية */}
        <div className="flex flex-col space-y-6">
          {isLoading ? (
            <>
              <Skeleton className="w-full rounded-lg h-[70px]" />
              <Skeleton className="w-full rounded-lg h-[70px]" />
              <Skeleton className="w-full rounded-lg h-[70px]" />
            </>
          ) : (
            <>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                label="اسم المستخدم"
                className="w-full"
              />
              <Input
                name="role"
                value={formData.role}
                isDisabled
                label="الوظيفة"
                className="w-full"
              />
              <Input
                name="email"
                value={formData.email}
                isDisabled
                label="البريد الإلكتروني"
                className="w-full"
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 text-justify leading-relaxed">
                ⚠️ <strong>تنويه هام:</strong> عذرًا، لا يمكنك تغيير البريد
                الإلكتروني، حيث إنه قد تم تسجيله واعتماده في قاعدة البيانات
                كمعرف رئيسي لحسابك. يُستخدم البريد الإلكتروني في عمليات التحقق
                والمصادقة وحفظ السجلات لضمان أمان البيانات. في حال رغبتك
                بتغييره، يرجى التواصل مع <strong>مدير الشركة</strong> حيث سيتطلب
                ذلك <strong>إلغاء حسابك الحالي وإنشاء حساب جديد</strong>.
                <br />
                <strong>مع خالص الشكر والتقدير،</strong>{" "}
                <strong className="mx-1">محمد حامد</strong>
              </p>
            </>
          )}
        </div>

        {/* القسم الخاص بكلمات المرور */}
        <div className="flex flex-col space-y-6 items-end">
          {isLoading ? (
            <>
              <Skeleton className="w-full rounded-lg h-[70px]" />
              <Skeleton className="w-full rounded-lg h-[70px]" />
              <Skeleton className="w-full rounded-lg h-[70px]" />
            </>
          ) : (
            <>
              <Input
                name="currentPassword"
                onChange={handleChange}
                type="password"
                label="كلمة المرور الحالية"
                isRequired
                className="w-full"
              />
              <Input
                name="newPassword"
                onChange={handleChange}
                type="password"
                label="كلمة المرور الجديدة"
                className="w-full"
              />
              <Input
                name="confirmPassword"
                onChange={handleChange}
                type="password"
                label="تأكيد كلمة المرور"
                className="w-full"
              />
            </>
          )}

          <Button
            variant="bordered"
            color="primary"
            type="submit"
            className="flex items-center gap-2 hover:bg-blue-600 hover:text-white rounded-lg shadow-sm transition duration-200 w-[200px]"
            disabled={isSubmitting}
          >
            <FaPen />
            {isSubmitting ? "جاري التحديث..." : "تعديل البيانات"}
          </Button>
        </div>
      </form>
      <div className="flex items-center justify-center mb-6">
        <Divider />
        <p className="text-gray-800 dark:text-gray-300 text-nowrap px-2">
          إعدادات البرنامج الرئيسية
        </p>
        <Divider />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-800 dark:text-gray-300">اعدادات المظهر</p>
            <ThemeSwitcher />
          </div>
          <div className="flex flex-col items-center gap-2">
            <LogoutButton />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4"
          >
            <Alert color={alert.type}>{alert.message}</Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
