import { useState, useRef, useEffect } from "react";
export const department_array = [];

function department() {
  let [departmentName, setDepartmentName] = useState("");
  let [code, setCode] = useState("");
  let [isEditing, setIsEditing] = useState(false);
  let [isCreating, setIsCreating] = useState(true);
  const [department_array, setDepartment_array] = useState<department[]>([]);
  let [description, setDescription] = useState("");
  let [idd, setIdd] = useState(0);
  let id = useRef<number>(101);
  const back = () => {
    setIsCreating(false);
    setIsEditing(false);
  };
  const save = () => {
    if (departmentName && code && description) {
      department_array.push({
        id: id.current,
        departmentName: departmentName,
        code: code,
        description: description,
      });
      console.log(department_array);
      setDepartment_array([...department_array]);
      localStorage.setItem("Department", JSON.stringify(department_array));
      id.current++;
      //  }
    }
    if (isEditing == true) {
      let index;
      department_array.map((v, i) => {
        if (v.id == idd) {
          index = i;
        }
      });
      department_array[index].id = idd;
      department_array[index].departmentName = departmentName;
      department_array[index].code = code;
      department_array[index].description = description;
    }
    setDepartment_array([...department_array]);

    setIsCreating(false);
    setIsEditing(false);
  };
  useEffect(() => {
    if (localStorage.getItem("Department")) {
      var old_data2 = JSON.parse(localStorage.Department);
      setDepartment_array(old_data2);
    }
  }, []);
  var deleteDepartment = (id: number) => {
    let index = 0;
    department_array.map((d, i) => {
      if (d.id === id) {
        index = i;
      }
    });
    department_array.splice(index, 1);
    setDepartment_array([...department_array]);
    localStorage.setItem("Department", JSON.stringify(department_array));
  };
  //--------------------------------------//
  const editDepartment = (c) => {
    setIsEditing(true);
    setIsCreating(false);
    setIdd(c.id);
    setDepartmentName(c.departmentName);
    setCode(c.code);
    setDescription(c.description);
  };

  return (
    <div className="main">
      <div className="main1">
        <h2>{isEditing == true ? "Edit Department" : "New Department"}</h2>
        <button type="button" className="btn btn-warning" onClick={back}>
          <i className="fa-regular fa-circle-left"></i> Back
        </button>
        <div className="form">
          <label htmlFor="departmentName">
            Department Name <span>*</span>
          </label>
          <input
            type="text"
            id="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="code">
            Code <span>*</span>
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="description">
            Description <span>*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="button" className="btn btn-success" onClick={save}>
          save
        </button>
      </div>

      <div className="display main2">
        <div className="table-bar">
          <div className="left">Manage Departments</div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>id</td>
              <td>Department Name</td>
              <td>Code</td>
              <td>Description</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {department_array.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.departmentName}</td>
                <td>{c.code}</td>
                <td>{c.description}</td>
                <td>
                  <i
                    className="fa-solid fa-pen-to-square edit-icon"
                    onClick={() => editDepartment(c)}
                  ></i>
                  <i
                    className="fa-solid fa-trash delete-icon"
                    onClick={() => deleteDepartment(c.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default department;
export interface department {
  id: number;
  departmentName: string;
  code: string;
  description: string;
}
