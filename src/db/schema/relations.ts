import { defineRelations } from "drizzle-orm"

import {
  users,
  refreshTokens,
  departments,
  students,
  teachers,
  academicYears,
  semesters,
  courses,
  classSections,
  enrollments,
  assessments,
  grades,
  attendances,
  feeRates,
  studentInvoices,
  invoiceItems,
  invoiceAdjustments,
  payments,
} from "../schema/index.js";

export const relations = defineRelations(
  {
    users,
    refreshTokens,
    departments,
    students,
    teachers,
    academicYears,
    semesters,
    courses,
    classSections,
    enrollments,
    assessments,
    grades,
    attendances,
    feeRates,
    studentInvoices,
    invoiceItems,
    invoiceAdjustments,
    payments,
  },
  (r) => ({
    users: {
        refreshTokens: r.many.refreshTokens(),

        student: r.one.students({
            from: r.users.id,
            to: r.students.userId,
        }),

        teacher: r.one.teachers({
            from: r.users.id,
            to: r.teachers.userId
        }),
        
        createdAdjustments: r.many.invoiceAdjustments(),
    },

    refreshTokens: {
        user: r.one.users({
            from: r.refreshTokens.userId,
            to: r.users.id
        }),
    },

    departments: {
        students: r.many.students(),
        teachers: r.many.teachers(),
        courses: r.many.courses(),
    },

    students: {
        user: r.one.users({
            from: r.students.userId,
            to: r.users.id,
        }),

        department: r.one.departments({
            from: r.students.departmentId,
            to: r.departments.id
        }),

        enrollments: r.many.enrollments(),
        invoices: r.many.studentInvoices(),
    },

    teachers: {
        user: r.one.users({
            from: r.teachers.userId,
            to: r.users.id
        }),

        department: r.one.departments({
            from: r.teachers.departmentId,
            to: r.departments.id,
        }),

        classSections: r.many.classSections(),

    },

    academicYears: {
        semesters: r.many.semesters(),

    },

    semesters: {
        academicYear: r.one.academicYears({
            from: r.semesters.academicYearId,
            to: r.academicYears.id,
        }),

        classSections: r.many.classSections(),

        feeRate: r.one.feeRates(),

        invoices: r.many.studentInvoices(),
        
    },

    courses: {
        department: r.one.departments({
            from: r.courses.departmentId,
            to: r.departments.id,
        }),

        classSections: r.many.classSections(),
    },

    classSections: {
      course: r.one.courses({
        from: r.classSections.courseId,
        to: r.courses.id,
      }),

      semester: r.one.semesters({
        from: r.classSections.semesterId,
        to: r.semesters.id,
      }),

      teacher: r.one.teachers({
        from: r.classSections.teacherId,
        to: r.teachers.id
      }),

      enrollments: r.many.enrollments(),

      assessments: r.many.assessments(),
    },

    enrollments: {
        student: r.one.students({
            from: r.enrollments.studentId,
            to: r.students.id,
        }),

        section: r.one.classSections({
            from: r.enrollments.sectionId,
            to: r.classSections.id,
        }),

        grades: r.many.grades(),

        attendances: r.many.attendances(),
    },

    assessmentType: {
        section: r.one.classSections({
            from: r.assessments.sectionId,
            to: r.classSections.id,
        }),

        grades: r.many.grades(),
    },

    grades: {
        enrollment: r.one.enrollments({
            from: r.grades.enrollmentId,
            to: r.enrollments.id
        }),

        assessment: r.one.assessments({
            from: r.grades.assessmentId,
            to: r.assessments.id,
        }),
    },

    attendances: {
        enrollment: r.one.enrollments({
            from: r.attendances.enrollmentId,
            to: r.enrollments.id,
        }),
    },

    feeRates: {
        semester: r.one.semesters({
            from: r.feeRates.semesterId,
            to: r.semesters.id,
        }),

    },

    studentInvoices: {
        student: r.one.students({
            from: r.studentInvoices.studentId,
            to: r.students.id,
        }),

        semester: r.one.semesters({
            from: r.studentInvoices.semesterId,
            to: r.semesters.id,
        }),

        items: r.many.invoiceItems(),

        adjustments: r.many.invoiceAdjustments(),

        payments: r.many.payments(),
    },

    invoiceItems: {
        invoice: r.one.studentInvoices({
            from: r.invoiceItems.invoiceId,
            to: r.studentInvoices.id,
        }),
    },

    invoiceAdjustments: {
        invoice: r.one.studentInvoices({
            from: r.invoiceAdjustments.invoiceId,
            to: r.studentInvoices.id,
        }),

        creator: r.one.users({
            from: r.invoiceAdjustments.createdBy,
            to: r.users.id,
        }),
    },

    payments: {
        invoice: r.one.studentInvoices({
            from: r.payments.invoiceId,
            to: r.studentInvoices.id,
        }),
    },

}));
