import "./App.css";
import { useEffect, useRef, useState } from "react";
import Department, { department } from "./Department";

function App() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [address, setAddress] = useState("");
  let [phone, setPhone] = useState("");
  const [task, setTask] = useState<employees[]>([]);
  let [isediting, setIsEditing] = useState(false);
  let [iscreating, setIsCreating] = useState(false);
  let [idd, setIdd] = useState(0);
  let [showdep, setshowdep] = useState(0);
  let ide = useRef(0);
  let [department_id, setDepartment_Id] = useState();
  let [array, setArray] = useState<Array<department>>([]);
  useEffect(() => {
    if (localStorage.getItem("Department")) {
      var old_data2 = JSON.parse(localStorage.Department);
      setArray(old_data2);
    }
  }, []);
  const opendepartment = () => {
    if (showdep == 0) {
      setshowdep(1);
      setIsEditing(false);
      setIsCreating(false);
    }
  };
  const back = () => {
    setIsCreating(false);
    setIsEditing(false);
  };
  useEffect(() => {
    if (localStorage.getItem("employees")) {
      var old_data = JSON.parse(localStorage.employees);
      setTask(old_data);
    }
  }, []);
  const save = () => {
    if (iscreating == true) {
      if (firstName && lastName && email && address && phone) {
        task.push({
          id: ide.current,
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
          phone: phone,
          department_id: department_id,
        });
        console.log(task);
        setTask([...task]);
        localStorage.setItem("employees", JSON.stringify(task));
      }
    }
    if (isediting == true) {
      let index;
      task.map((v, i) => {
        if (v.id == idd) {
          index = i;
        }
      });
      task[index].id = idd;
      task[index].firstName = firstName;
      task[index].lastName = lastName;
      task[index].address = address;
      task[index].phone = phone;
      task[index].email = email;
    }
    setTask([...task]);

    setIsCreating(false);
    setIsEditing(false);
  };

  var deleteTask = (id) => {
    let index;
    task.map((d, i) => {
      if (d.id === id) {
        index = i;
      }
    });
    task.splice(index, 1);
    setTask([...task]);
    localStorage.setItem("employees", JSON.stringify(task));
  };
  //--------------------------------------//
  const editTask = (c) => {
    setIsEditing(true);
    setIsCreating(false);
    setFirstName(c.firstName); //set the value od firstName
    console.log(firstName);
    setLastName(c.lastName);
    setEmail(c.email);
    setPhone(c.phone);
    setAddress(c.address);
    setIdd(c.id);
  };
  const createtask = () => {
    setAddress("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setIsEditing(false);
    setIsCreating(true);
    ide.current++;
    setIdd(ide.current);
  };

  return (
    <div>
      <div className={showdep !== 0 ? "container" : "container d-none"}>
        <Department></Department>
      </div>
      <div className={showdep == 0 ? "new " : "new d-none"}>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid top">
            <div className="navbar-brand logo">
              <i className="fa-solid fa-house-chimney"></i>
            </div>
            <button className="btn btn-success" onClick={opendepartment}>
              Department
            </button>
            <div className="name">
              <i className="fa-solid fa-user"></i>Employee Managment
            </div>
          </div>
        </nav>
        <div
          className={
            isediting == true || iscreating == true
              ? "form-container"
              : "form-container d-none"
          }
        >
          <div className="newemployee">
            <h2>New Employee</h2>
            <button type="button" className="btn btn-warning" onClick={back}>
              <i className="fa-regular fa-circle-left"></i>
              Back
            </button>
          </div>
          <div className="form">
            <label htmlFor="firstName">
              First Name <span>*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(c) => {
                setFirstName(c.target.value);
              }}
              required
            />
          </div>

          <div className="form">
            <label htmlFor="lastName">
              Last Name <span>*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(c) => {
                setLastName(c.target.value);
              }}
              required
            />
          </div>

          <div className="form">
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(c) => {
                setEmail(c.target.value);
              }}
              required
            />
          </div>

          <div className="form">
            <label htmlFor="address">
              Address <span>*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={address}
              onChange={(c) => {
                setAddress(c.target.value);
              }}
            ></textarea>
          </div>

          <div className="form">
            <label htmlFor="phone">
              Phone <span>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(c) => {
                setPhone(c.target.value);
              }}
              required
            />
          </div>
          <div className="form">
            <label htmlFor="select">
              Select Depatment <span>*</span>
            </label>

            <select
              className="select"
              id=""
              value={department_id}
              onChange={(c) => {
                setDepartment_Id(c.target.value);
              }}
            >
              select department
              {array.map((c) => (
                <option key={c.idd} value={c.id}>
                  {c.departmentName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className=" save btn btn-success"
            onClick={save}
          >
            Submit
          </button>
        </div>
        <div className="display">
          <div className="table-bar">
            <div className="left">Manage Employees</div>
            <div>
              <button className="btn btn-success" onClick={createtask}>
                Add Employee
              </button>
            </div>
          </div>
          <table className="table table-bordered border-secondry">
            <thead>
              <tr>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>Address</td>
                <td>Phone</td>
                <td>Department</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {task.map((c) => (
                <tr key={c.id}>
                  <td>{c.firstName}</td>
                  <td>{c.lastName}</td>
                  <td>{c.email}</td>
                  <td>{c.address}</td>
                  {array.map((d) => (
                    <td
                      className={
                        c.department_id == d.id ? "dpname" : "dpname d-none"
                      }
                    >
                      {d.departmentName}
                    </td>
                  ))}
                  <td>{c.phone}</td>
                  <td>
                    <i
                      className="fa-solid fa-pen-to-square edit-icon"
                      onClick={() => {
                        editTask(c);
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-trash delete-icon"
                      onClick={() => deleteTask(c.id)}
                    ></i>
                    <button type="button" className="btn btn-primary education">
                      Education
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default App;
export interface employees {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: number;
  department_id: number;
}
