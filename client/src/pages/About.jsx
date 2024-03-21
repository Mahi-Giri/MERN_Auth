const About = () => {
    return (
        <div className="px-4 py-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-slate-700 uppercase">Security Measures</h2>
            <p className="mb-4 text-slate-700">
                MERN-AUTH integrates several security measures to protect user data and enhance the
                application's reliability. <br />
                These include: Secure password storage using hashing and salting techniques to prevent
                password cracking. <br />
                Implementation of JWT for secure transmission of information between parties as a JSON object,
                ensuring that user sessions are securely managed and verified. <br />
                CORS (Cross-Origin Resource Sharing) policies to restrict unauthorized domain access and
                protect against common web vulnerabilities. <br />
                Input validation to prevent SQL injection, XSS (Cross-Site Scripting), and other common
                security threats.
            </p>
            <br />
            <h2 className="text-2xl font-bold mb-4 text-slate-700 uppercase">Key Features</h2>
            <p className="mb-4 text-slate-700">
                User Registration: New users can create accounts by providing essential information. The
                system securely stores user data in MongoDB, a NoSQL database, offering flexibility and
                scalability. <br />
                User Authentication: Implements secure login mechanisms, including password hashing and JWT
                (JSON Web Tokens) for maintaining session integrity. This ensures that user credentials are
                protected and that each user session is securely managed.
                <br />
                User Profile Update: Authorized users can update their personal information post-registration.
                This feature includes validations to ensure data integrity and security during the update
                process.
                <br />
                User Deletion: Provides the functionality for users to delete their accounts, thereby adhering
                to privacy laws and regulations. This feature includes safeguards to prevent unauthorized
                account deletion.
            </p>
        </div>
    );
};

export default About;
