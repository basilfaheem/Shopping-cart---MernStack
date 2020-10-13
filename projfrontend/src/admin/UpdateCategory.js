import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
  });

  const { name, error, success } = values;

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      console.log(data.name);

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setValues({
      ...values,
      name: event.target.value,
      error: "",
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      success: false,
      error: "",
    });

    //backend request fired
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setValues({
            ...values,
            error: true,
          });
        } else {
          setValues({
            ...values,
            name: "",
            error: "",
            success: true,
          });
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to update category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead text-dark">Update Category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update Category"
      description="Update a Category here"
      className="container bg-success p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;

// import React, { useEffect, useState } from "react";
// import { isAuthenticated } from "../auth/helper";
// import { Link } from "react-router-dom";
// import Base from "../core/Base";
// import { updateTheCategory, getCategory } from "./helper/adminapicall";

// const UpdateCategory = ({ match }) => {
//   const [name, setName] = useState("");
//   const [error, setError] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const { user, token } = isAuthenticated();

//   const goBack = () => {
//     return (
//       <div className="mt-5">
//         <Link className="btn btn-small btn-success mb-3" to="/admin/dashboard">
//           Admin Home
//         </Link>
//       </div>
//     );
//   };

//   const preload = (categoryId) => {
//     getCategory(categoryId).then((data) => {
//       if (data.error) {
//         setError(true);
//       } else {
//         setName(data.name);
//       }
//     });
//   };

//   useEffect(() => {
//     preload(match.params.categoryId);
//   }, []);

//   const handleChange = (event) => {
//     setError("");
//     setName(event.target.value);
//   };

//   const successMessage = () => {
//     if (success) {
//       return <h4 className="text-success">Category Updated Successfully</h4>;
//     }
//   };

//   const warningMessage = () => {
//     if (error) {
//       return <h4 className="text-success">Failed To Update Category</h4>;
//     }
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     setError("");
//     setSuccess(false);

//     // Backend request fired
//     updateTheCategory(match.params.categoryId, user._id, token, { name }).then(
//       (data) => {
//         console.log(data);
//         if (!data) {
//           setError(true);
//         } else {
//           setError("");
//           setSuccess(true);
//           setName("");
//         }
//       }
//     );
//   };

//   const myCategoryForm = () => {
//     return (
//       <form>
//         <div className="form-group">
//           <p className="lead">Update the Category</p>
//           <input
//             className="form-control my-3"
//             type="text"
//             onChange={handleChange}
//             value={name}
//             autoFocus
//             required
//             placeholder="For Ex- Summer"
//           />
//           <button onClick={onSubmit} className="btn btn-outline-info">
//             Update Category
//           </button>
//         </div>
//       </form>
//     );
//   };

//   return (
//     <Base
//       title="Category Updation Area"
//       description="An area for updation of Categories"
//       className="container bg-info p-4"
//     >
//       <div className="row bg-white rounded">
//         <div className="col-md-8 offset-md-2">
//           {successMessage()}
//           {warningMessage()}
//           {myCategoryForm()}
//           {goBack()}
//         </div>
//       </div>
//     </Base>
//   );
// };

// export default UpdateCategory;
