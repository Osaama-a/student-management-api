CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" text NOT NULL UNIQUE,
	"password_hash" text NOT NULL,
	"role" text DEFAULT 'student' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"revoked_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "departments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"department_name" text NOT NULL UNIQUE,
	"department_code" text NOT NULL UNIQUE,
	"office_location" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL UNIQUE,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"student_number" text NOT NULL UNIQUE,
	"date_of_birth" date,
	"gender" text NOT NULL,
	"phone" text,
	"address" text,
	"department_id" uuid NOT NULL,
	"intake_year" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teachers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL UNIQUE,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"teacher_number" text NOT NULL UNIQUE,
	"gender" text NOT NULL,
	"phone" text,
	"address" text,
	"department_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "academic_years" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"year_label" text NOT NULL UNIQUE,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "semester" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"accadamic_year_id" uuid NOT NULL,
	"term_name" text NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "accadmicYear_termName" UNIQUE("accadamic_year_id","term_name")
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"course_name" text NOT NULL,
	"course_code" text NOT NULL UNIQUE,
	"credit_hours" integer NOT NULL,
	"department_id" uuid NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "class_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"course_id" uuid NOT NULL,
	"semester_id" uuid NOT NULL,
	"teacher_id" uuid NOT NULL,
	"section_name" text NOT NULL,
	"capacity" integer,
	"room" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "course_semester_section" UNIQUE("course_id","semester_id","section_name")
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"student_id" uuid NOT NULL,
	"section_id" uuid NOT NULL,
	"enrollment_date" date NOT NULL,
	"status" text DEFAULT 'enrolled' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "student_section_" UNIQUE("student_id","section_id")
);
--> statement-breakpoint
CREATE TABLE "assessments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"section_id" uuid NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"description" text NOT NULL,
	"max_score" numeric NOT NULL,
	"wight" numeric,
	"assessment_date" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grades" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"enrollment_id" uuid NOT NULL,
	"assessment_id" uuid NOT NULL,
	"score" numeric NOT NULL,
	"feedback" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "enrollment_assessment_unique" UNIQUE("enrollment_id","assessment_id")
);
--> statement-breakpoint
CREATE TABLE "attendances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"enrollment_id" uuid NOT NULL,
	"attendance_date" date NOT NULL,
	"status" text NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "enrollment_date_unique" UNIQUE("enrollment_id","attendance_date")
);
--> statement-breakpoint
CREATE TABLE "fee_rate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"semester_id" uuid NOT NULL UNIQUE,
	"amount_per_credit" numeric NOT NULL,
	"currency" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"student_id" uuid NOT NULL,
	"semester_id" uuid NOT NULL,
	"currency" text NOT NULL,
	"issued_at" date NOT NULL,
	"due_date" date NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "student_semester_invoice_unique" UNIQUE("student_id","semester_id")
);
--> statement-breakpoint
CREATE TABLE "invoice_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"invoice_id" uuid NOT NULL,
	"description" text,
	"quantity" integer NOT NULL,
	"unit_price" numeric NOT NULL,
	"amount" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice_adjustment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"invoice_id" uuid NOT NULL,
	"amount" numeric NOT NULL,
	"reason" text NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"invoice_id" uuid NOT NULL,
	"amount" numeric NOT NULL,
	"currency" text NOT NULL,
	"payment_method" text NOT NULL,
	"transaction_reference" text,
	"payment_date" date NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_department_id_departments_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id");--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_department_id_departments_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id");--> statement-breakpoint
ALTER TABLE "semester" ADD CONSTRAINT "semester_accadamic_year_id_academic_years_id_fkey" FOREIGN KEY ("accadamic_year_id") REFERENCES "academic_years"("id");--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_department_id_departments_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id");--> statement-breakpoint
ALTER TABLE "class_sections" ADD CONSTRAINT "class_sections_course_id_courses_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id");--> statement-breakpoint
ALTER TABLE "class_sections" ADD CONSTRAINT "class_sections_semester_id_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester"("id");--> statement-breakpoint
ALTER TABLE "class_sections" ADD CONSTRAINT "class_sections_teacher_id_teachers_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_students_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_section_id_class_sections_id_fkey" FOREIGN KEY ("section_id") REFERENCES "class_sections"("id");--> statement-breakpoint
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_section_id_class_sections_id_fkey" FOREIGN KEY ("section_id") REFERENCES "class_sections"("id");--> statement-breakpoint
ALTER TABLE "grades" ADD CONSTRAINT "grades_enrollment_id_enrollments_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id");--> statement-breakpoint
ALTER TABLE "grades" ADD CONSTRAINT "grades_assessment_id_assessments_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("id");--> statement-breakpoint
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_enrollment_id_enrollments_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id");--> statement-breakpoint
ALTER TABLE "fee_rate" ADD CONSTRAINT "fee_rate_semester_id_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester"("id");--> statement-breakpoint
ALTER TABLE "student_invoices" ADD CONSTRAINT "student_invoices_student_id_students_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id");--> statement-breakpoint
ALTER TABLE "student_invoices" ADD CONSTRAINT "student_invoices_semester_id_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester"("id");--> statement-breakpoint
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoice_id_student_invoices_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "student_invoices"("id");--> statement-breakpoint
ALTER TABLE "invoice_adjustment" ADD CONSTRAINT "invoice_adjustment_invoice_id_student_invoices_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "student_invoices"("id");--> statement-breakpoint
ALTER TABLE "invoice_adjustment" ADD CONSTRAINT "invoice_adjustment_created_by_users_id_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_student_invoices_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "student_invoices"("id");