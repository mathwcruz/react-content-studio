import { Route, Routes } from 'react-router'
import { AppLayout } from './layout'
import { ComponentsPage } from '../features/components-preview/components-page'
import { ContentDetailPage } from '../features/content-detail/content-detail-page'
import { ContentLibraryPage } from '../features/content-library/content-library-page'
import { DashboardPage } from '../features/dashboard/dashboard-page'
import { EditorPage } from '../features/editor/editor-page'
import { FeedbackPage } from '../features/feedback/feedback-page'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="contents" element={<ContentLibraryPage />} />
        <Route path="contents/:contentId" element={<ContentDetailPage />} />
        <Route path="contents/:contentId/edit" element={<EditorPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="components" element={<ComponentsPage />} />
      </Route>
    </Routes>
  )
}
