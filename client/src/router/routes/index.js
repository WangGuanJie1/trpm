import accountRoutes from './accountRoutes'
import announcementMsgRoutes from './announcementMsgRoutes'
import basisMsgRoutes from './basisMsgRoutes'
import homeRoutes from './homeRoutes'
import logRoutes from './logRoutes'
import projActiveRoutes from './projActiveRoutes'
import projAuditRoutes from './projAuditRoutes'
import projMsgRoutes from './projMsgRoutes'
import projReviewRoutes from './projReviewRoutes'
import teacherMsgRoutes from './teacherMsgRoutes'

export default [
  [...accountRoutes],
  [...announcementMsgRoutes],
  [...basisMsgRoutes],
  [...homeRoutes],
  [...logRoutes],
  [...projActiveRoutes],
  [...projAuditRoutes],
  [...projMsgRoutes],
  [...projReviewRoutes],
  [...teacherMsgRoutes]
]
