import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Blogs = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [blogs, setBlogs] = useState([]);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log(data);
    // axios
    //   .post("https://express-mongodb-api-server.onrender.com/api/blogs", data)
    //   .then((res) => {
    //     console.log(res);
    //     alert("เพิ่มข้อมูลเรียบร้อยแล้วครับ");
    //     //window.location.reload();
    //   });
  };

  const getData = async () => {
    axios
      .get("https://express-mongodb-api-server.onrender.com/api/blogs")
      .then((res) => {
        setBlogs(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Blogs</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Blogs</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">Blog Create</div>
                <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label htmlFor="">Title</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        {...register("title", { required: true })}
                      />
                      {errors.title && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Content</label>
                      <input
                        className="form-control"
                        {...register("content", { required: true })}
                      />
                      {errors.content && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Author</label>
                      <input
                        className="form-control"
                        {...register("author", { required: true })}
                      />
                      {errors.author && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                    <span>
                      Checkbox 1
                      <input
                        type="checkbox"
                        {...register("checkbox", { required: true })}
                        value="A"
                      />
                    </span>
                    <span>
                      Checkbox 2
                      <input
                        type="checkbox"
                        {...register("checkbox", { required: true })}
                        value="B"
                      />
                    </span>
                    <span>
                      Checkbox 3
                      <input
                        type="checkbox"
                        {...register("checkbox", { required: true })}
                        value="C"
                      />
                      <br />
                      {errors.checkbox && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </span>
                    <br />
                    <span>
                      <label>Radio 1</label>
                      <input type="radio" {...register("radio", { required: true })} value="A" />
                    </span>
                    <span>
                      <label>Radio 2</label>
                      <input type="radio" {...register("radio", { required: true })} value="B" />
                    </span>
                    <span>
                      <label>Radio 3</label>
                      <input type="radio" {...register("radio", { required: true })} value="C" />
                    </span>
                    <br />
                      {errors.radio && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    <div className="float-right">
                      <input className="btn btn-primary" type="submit" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header">Blogs list</div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Author</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((blog, index) => {
                        return (
                          <tr key={blog._id}>
                            <td>{index}</td>
                            <td>{blog.title}</td>
                            <td>{blog.content}</td>
                            <td>{blog.author}</td>
                            <td>{blog.createdAt}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
