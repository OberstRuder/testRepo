export function getDate(createdAt) {
    let date = new Date(+createdAt).toLocaleString('en-GB', { timeZone: 'UTC' });
    return date.substring(0, date.length - 3)
}