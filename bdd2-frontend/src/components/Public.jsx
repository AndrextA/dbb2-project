import Footer from "./Footer";
import Navbar from "./Navbar";

function Public() {
  return (
    <section className="container-fluid d-flex flex-column min-vh-100 text-center">
        <Navbar />
      <header className="row">
        <div className="col py-2">
          <h1 className="display-4 text-center mx-auto">
            Welcome to Database II Project
          </h1>
        </div>
      </header>
      <main className="row flex-grow-1">
        <div className="col py-2">
          <p className="display-5">
            This project is a simple example of a database-driven web
            application. To show what we have learned in the course, we have
            created a simple web application that allows users to create, read,
            update, and delete notes. The application also allows users to
            create, read, update, and delete users. The application is built
            using React, React Router, and a mock API.
          </p>
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default Public;
