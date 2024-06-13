export { default } from 'next-auth/middleware'
export const config = {
    matcher: [
        '/admin/dashboard',
        '/admin/dashboard/projects',
        '/admin/dashboard/skills',
        '/admin/dashboard/contacts',
        '/admin/dashboard/users',
        '/admin/dashboard/legal',
        '/admin/dashboard/settings',
    ]
}