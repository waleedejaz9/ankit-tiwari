export const ENDPOINTS = {
  // Auth
  SEND_PASS_RESET_OTP: 'auth/send-reset-pass-otp',
  RESET_PASS: '/auth/reset-password',

  // Contacts
  GET_TOTAL_CLIENTS: '/client-contact/total-clients',
  CREATE_NEW_POSITION: '/client-contact/position',
  ALL_CLIENT_POSITION: '/client-contact/position',
  ONE_CLIENT_POSITION: '/client-contact/position/',
  CREATE_CLIENTS: '/client-contact',

  // Contacts --> employee
  ALL_EMPLOYEES: '/employee-contact/allemployees',
  CREATE_NEW_EMPLOYEE_POSITION: '/employee-contact/position',
  ALL_EMPLOYEE_POSITION: '/employee-contact/position',
  ONE_EMPLOYEE_POSITION: '/employee-contact/position/',

  // Roles --> role
  ALL_ROLES: '/role/',

  // Contacts --> Leads
  LEAD_CONTACT: '/lead-contact/',
  CREATE_NEW_LEAD_POSITION: '/lead-contact/position',
  ALL_LEAD_POSITION: '/lead-contact/position',

  // Contacts --> Relationships
  CREATE_NEW_RELATION_POSITION: '/relation-contact/position',
  ALL_RELATION_POSITION: '/relation-contact/position',
  ONE_RELATION_POSITION: '/relation-contact/position/',

  // Contacts --> Vendor
  VENDOR_CONTACT: '/vendor-contact/',
  CREATE_NEW_VENDOR_POSITION: '/vendor-contact/position',
  ALL_VENDOR_POSITION: '/vendor-contact/position',


  //Membership
  MEMBER_TYPE: '/membership-type/',
  MEMBER_TYPES: '/membership-type',
  CREAT_NEW_MEMBERSHIP_TYPE:'/membership-type/add',


  // Members
  GET_TOTAL_MEMBERS: '/member-contact/total-members',
  CREATE_NEW_MEMBERS_POSITION: '/member-contact/position',
  ALL_MEMBERS_POSITION: '/member-contact/position',
  ONE_MEMBERS_POSITION: '/member-contact/position/',
  CREATE_NEW_MEMBERS_TAG: '/member-contact/tag',
  ALL_MEMBERS_TAG: '/member-contact/tag',
  ONE_MEMBERS_TAG: '/member-contact/tag/',
  CREATE_MEMBER: '/member-contact',


  //Document
  UPLOAD_DOCUMENT: '/document/upload',
  ADD_RECIPIENTS: '/document-recipient/',
  EDIT_RECIPIENTS: '/document-recipient/recipient/',
  GET_DOC_BY_HASH: '/document/email-link?hashCode=',
  GET_DOC_BY_TOKEN: '/document/email-link?token=',
  Get_DOCUMENT_BY_ID: '/document/documentId/',
  GET_USER_DOCS: '/document/',
  GET_RECEIVED_DOCS: '/document/received',
  DELETE_DOCUMENTS: '/document/delete',
  DOCUMENT_RESEND: 'document-recipient/email/resend',

  //custome fields
  ADD_CUSTOM_FIELD: '/document-custome-fields/add',
  DELETE_CUSTOM_FIELD: '/document-custome-fields/delete?id=',
  GET_CUSTOM_FIELDS_BY_USER: '/document-custome-fields/getbyuser',
  // get user
  GET_USER: '/user',

  // invoice
  GET_INVOICE: '/invoice',
  GET_CUSTOMER: '/customer',

  //Document- Signature & stamps & initials
  SIGNATURE_AND_INITIAL: '/document-signature/signatures',
  UPLOAD_SIGNATURES: '/document-signature/upload',

  //Document- Signature & stamps & initials
  SIGNATURE_AND_INITIAL: '/document-signature/signatures',
  UPLOAD_SIGNATURES: '/document-signature/upload',

  // Marketing Emails
  COMPOSE_EMAIL: 'marketing/compose-email',
  GET_ALL_EMAILS: 'marketing/emails',
  GET_EMAIL_BY_ID: 'marketing/emails/',
  DELETE_EMAILS: 'marketing/emails/',
  MARK_EMAILS_AS_SPAM: 'marketing/emails/mark-as-spam',
  STAR_EMAILS: 'marketing/emails/star',
  SEND_SCHEDULED_EMAIL_NOW: 'marketing/emails/send-scheduled-email-now',

  // Form Builder
  CREATE_FORM: 'formBuilder/create',
  GET_FORM: 'formBuilder/get',
  DELETE_FORM: 'formBuilder/delete',

  // Projects Management
  CREATE_PROJECT: '/project-manager/createProject',
  GET_PROJECTS: '/project-manager/getprojects?id=',
  DELETE_PROJECT: '/project-manager/deleteProject?id=',
  UPDATE_PROJECT: '/project-manager/updateProject',

  GET_TABLES: '/project-manager/get?id=',
  CREATE_NEW_TABLE: '/project-manager/createTable',
  DELETE_TABLE: '/project-manager/deleteTable',
  ADD_ROW: '/project-manager/addRow',
  DELETE_ROW: '/project-manager/deleteRow',
  ADD_COLUMN: '/project-manager/addColumn',
  DELETE_COLUMN: '/project-manager/deleteColumn',
  UPDATE: '/project-manager/update',
  GET_ACTIVITY_LAST_SEEN: '/project-manager/getActivity?id=',
};
