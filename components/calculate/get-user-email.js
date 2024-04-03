export default function getUserEmail(email) {
    const splitedUserEmail = email.split('.');
    return splitedUserEmail[0];
}
