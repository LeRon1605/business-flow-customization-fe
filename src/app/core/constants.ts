export const CLAIMS = {
    ID: 'ID',
    ROLE: 'Role',
    NAME: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
    EXPIRE: 'exp'
}

export const ROLE = {
    ADMIN: 'Admin',
    USER: 'User'
}

export const TOKEN_STORAGE = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token'
}

export const ERROR_MESSAGE : any = {
    'DuplicateUserName': 'Email đã tồn tại',
    'PasswordMismatch': 'Mật khẩu không chính xác',
    'User:000002': 'Tài khoản không tồn tại',
    'User:000004': 'Tài khoản không tồn tại',
    'TenantInvitation:000001': 'Đã mời thành viên trước đây',
    'TenantInvitation:000002': 'Thành viên đã tồn tại trong doanh nghiệp',
    'TenantInvitation:000003': 'Yêu cầu không hợp lệ'
};