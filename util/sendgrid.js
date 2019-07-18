const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const verificationEmail = (email, username, verificationToken) => {
    const msg = {
        to: email,
        from: 'resfinder.team@example.com',
        subject: 'Verify your email',
        html: `
        <div
            style="
            width: 600px;
            margin: 0 auto;
            background: #F3F3F3"
            >
            <div
            style="padding: 10px;
                border-bottom: 1.5px solid #F3F3F3;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                border-color: 1px solid #ccc;
                background: #fff;
                display: flex;
                align-items: center;"
            >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Zomato-flat-logo.png"
                alt="zomato-logo"
                style="height: 60px; border-radius: 4px"
            />
            <span
                style="padding-left: 10px;
                color: red;
                font-weight: 500;
                font-size: 22px;
                font-family: sans-serif;
                margin-top: 12px;"
            >
                Restaurant Finder
            </span>
            </div>
            <div style=" padding: 25px 50px 25px 50px; background: #fff ">
            <div
                style="font-size: 16px;
                margin-bottom: 15px;
                color:#000;
                "
            >
                Dear ${username},
            </div>
            <div
                style="
                font-size: 14px;
                margin-bottom: 15px;
                color:#000;
                "
            >
                To activate your Restaurant Finder Account, please verify your email address.
                <br />
                Your account will not be created until your email address is confirmed.
            </div>
            <div style=" margin-bottom: 15px ">
                <a
                style="
                    font-size: 14px;
                    text-decoration: underline;
                "
                href="http://localhost:3000/confirm/?token=${verificationToken}"
                >
                Confirm your email
                </a>
            </div>
            <div
                style="
                font-size: 14px;
                margin-bottom: 15px;
                color:#000;
                "
            >
                Or, copy and paste the following URL into your browser:
            </div>
            <div>
                <a
                href="http://localhost:3000/confirm/?token=${verificationToken}"
                style="
                    font-size: 14px;
                    text-decoration: underline;
                "
                >
                http://localhost:3000/confirm/?token=${verificationToken}
                </a>
            </div>
            </div>
        </div>
      `,
    };
    sgMail.send(msg);
};
const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'enlision@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you again.`,
    });
};

module.exports = {
    verificationEmail,
    sendCancelationEmail,
};
