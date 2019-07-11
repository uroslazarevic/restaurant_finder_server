/**
 * Decode JSON web token
 *  @param {Object} idToken idToken data used for extracting user data for validating oAuthEmail and database user email
 * If there is no match between oAuthEmail and database user email, user must register his email in application
 */

exports.decodeJwt = (idToken) => {
    const segments = idToken.split('.');

    if (segments.length !== 3) {
        throw new Error('Not enough or too many segments');
    }

    // All segment should be base64
    const headerSeg = segments[0];
    const payloadSeg = segments[1];
    const signatureSeg = segments[2];

    // base64 decode and parse JSON
    const header = JSON.parse(base64urlDecode(headerSeg));
    const payload = JSON.parse(base64urlDecode(payloadSeg));

    return {
        header: header,
        payload: payload,
        signature: signatureSeg,
    };
};

function base64urlDecode(str) {
    return new Buffer.from(base64urlUnescape(str), 'base64').toString();
}

function base64urlUnescape(str) {
    str += Array(5 - (str.length % 4)).join('=');
    return str.replace(/\-/g, '+').replace(/_/g, '/');
}
