const Home = () => {
    return (
        <div className="px-4 py-12 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-slate-700 uppercase">Welcome to AUTH-APP</h1>

            <p className="mb-4 text-slate-700">
                MERN-AUTH is an advanced project designed to demonstrate comprehensive user authentication and
                management within a web application. Leveraging the robust MERN stack, which includes MongoDB,
                Express.js, React.js, and Node.js, this project offers a complete ecosystem for creating,
                updating, and deleting user profiles, ensuring a secure and efficient user management system.
                At its core, MERN-AUTH focuses on implementing best practices for user authentication and
                authorization, providing a solid foundation for both developers and companies looking to
                integrate reliable security features into their applications. The project emphasizes not just
                the functionality of adding or removing users but also the critical aspect of securely
                managing user data and access permissions.
            </p>
            <br />
            <p className="mb-4 text-slate-700">
                This project stands out due to its comprehensive approach to user management and
                authentication, combining modern web technologies and security best practices. It serves as an
                excellent template or starting point for developers looking to understand or implement
                authentication mechanisms in their applications. Moreover, MERN-AUTH's modular architecture
                allows for easy integration and scalability, making it suitable for projects of any size.
            </p>
        </div>
    );
};

export default Home;
