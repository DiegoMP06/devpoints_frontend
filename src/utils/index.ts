export const formatDate = (str: string) => {
    const date = new Date(str);
    return Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).format(date);
}