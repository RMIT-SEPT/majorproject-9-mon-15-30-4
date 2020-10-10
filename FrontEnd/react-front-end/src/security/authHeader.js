

export function authHeader()
{
    if(localStorage.getItem('isLoggedIn') === true)
    {
        return `Authorization: ${localStorage.getItem('login')}`;
    }
    else
    {
        return "";
    }
}