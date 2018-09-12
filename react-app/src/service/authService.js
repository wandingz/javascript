export const authService = {
    token: 'undefined',
    checkUserStatus: function() {
        return this.token !== undefined;
    }
}