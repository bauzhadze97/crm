import Sidebar from "../../components/Sidebar";
import DeleteIcon from '../../assets/images/delete.png'
import EditIcon from '../../assets/images/edit.png'
import VisibilityIcon from '../../assets/images/visibility.png'
import './index.css';
const CreatedDailyTaskPage = () => {
    return(
        <div className="vacation-dashboard-container">
            <Sidebar/>
            <div className='main-form-container'>
                <div className="table-container">
                    <h2 className="page-name">All Daily Task Report</h2>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Daily Task Name</th>
                                <th>Department</th>
                                <th>Name/Surname</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                         {/* Add your data rows here */}
<tr>
    <td>03/15/2024</td>
    <td>Task A</td>
    <td>Marketing</td>
    <td>Emily Clark</td>
    <td>Brief description of Task A</td>
    <td >
            <div className="flex justify-center">
           <a href="/make-comment"> <img src={VisibilityIcon} alt="View" className="action-icon" /></a>
            <img src={EditIcon} alt="Edit" className="action-icon" />
            <img src={DeleteIcon} alt="Delete" className="action-icon" />
        </div>
    </td>
</tr>
<tr>
    <td>04/20/2024</td>
    <td>Task B</td>
    <td>HR</td>
    <td>Michael Smith</td>
    <td>Brief description of Task B</td>
    <td >
             <div className="flex justify-center">
           <a href="/make-comment"> <img src={VisibilityIcon} alt="View" className="action-icon" /></a>
            <img src={EditIcon} alt="Edit" className="action-icon" />
            <img src={DeleteIcon} alt="Delete" className="action-icon" />
        </div>
    </td>
</tr>
<tr>
    <td>05/11/2024</td>
    <td>Task C</td>
    <td>IT</td>
    <td>Jessica Brown</td>
    <td>Brief description of Task C</td>
    <td >
            <div className="flex justify-center">
           <a href="/make-comment"> <img src={VisibilityIcon} alt="View" className="action-icon" /></a>
            <img src={EditIcon} alt="Edit" className="action-icon" />
            <img src={DeleteIcon} alt="Delete" className="action-icon" />
        </div>
    </td>
</tr>
<tr>
    <td>06/25/2024</td>
    <td>Task D</td>
    <td>Finance</td>
    <td>Daniel Lee</td>
    <td>Brief description of Task D</td>
    <td >
            <div className="flex justify-center">
           <a href="/make-comment"> <img src={VisibilityIcon} alt="View" className="action-icon" /></a>
            <img src={EditIcon} alt="Edit" className="action-icon" />
            <img src={DeleteIcon} alt="Delete" className="action-icon" />
        </div>
    </td>
</tr>
<tr>
    <td>07/30/2024</td>
    <td>Task E</td>
    <td>Customer Service</td>
    <td>Sarah Johnson</td>
    <td>Brief description of Task E</td>
    <td >
             <div className="flex justify-center">
           <a href="/make-comment"> <img src={VisibilityIcon} alt="View" className="action-icon" /></a>
            <img src={EditIcon} alt="Edit" className="action-icon" />
            <img src={DeleteIcon} alt="Delete" className="action-icon" />
        </div>
    </td>
</tr>
<tr>
    <td>08/14/2024</td>
    <td>Task F</td>
    <td>Sales</td>
    <td>David Wilson</td>
    <td>Brief description of Task F</td>
    <td >
             <div className="flex justify-center">
           <a href="/make-comment"> <img src={VisibilityIcon} alt="View" className="action-icon" /></a>
            <img src={EditIcon} alt="Edit" className="action-icon" />
            <img src={DeleteIcon} alt="Delete" className="action-icon" />
        </div>
    </td>
</tr>
<tr>
    <td>09/12/2024</td>
    <td>Task G</td>
    <td>Legal</td>
    <td>Olivia Martinez</td>
    <td>Brief description of Task G</td>
    <td >
             <div className="flex justify-center">
           <a href="/make-comment"> <img src={VisibilityIcon} alt="View" className="action-icon" /></a>
            <img src={EditIcon} alt="Edit" className="action-icon" />
            <img src={DeleteIcon} alt="Delete" className="action-icon" />
        </div>
    </td>
</tr>
<tr>
    <td>10/01/2024</td>
    <td>Task H</td>
    <td>Operations</td>
    <td>Lucas Anderson</td>
    <td>Brief description of Task H</td>
    <td >
             <div className="flex justify-center">
           <a href="/make-comment"> <img src={VisibilityIcon} alt="View" className="action-icon" /></a>
            <img src={EditIcon} alt="Edit" className="action-icon" />
            <img src={DeleteIcon} alt="Delete" className="action-icon" />
        </div>
    </td>
</tr>
<tr>
    <td>11/19/2024</td>
    <td>Task I</td>
    <td>Product</td>
    <td>Alice White</td>
    <td>Brief description of Task I</td>
    <td >
           <div className="flex justify-center">
           <a href="/make-comment"> <img src={VisibilityIcon} alt="View" className="action-icon" /></a>
            <img src={EditIcon} alt="Edit" className="action-icon" />
            <img src={DeleteIcon} alt="Delete" className="action-icon" />
        </div>
    </td>
</tr>
<tr>
    <td>12/03/2024</td>
    <td>Task J</td>
    <td>Research</td>
    <td>Robert Harris</td>
    <td>Brief description of Task J</td>
    <td >
        <div className="flex justify-center">
           <a href="/make-comment"> <img src={VisibilityIcon} alt="View" className="action-icon" /></a>
            <img src={EditIcon} alt="Edit" className="action-icon" />
            <img src={DeleteIcon} alt="Delete" className="action-icon" />
        </div>
    </td>
</tr>

                        </tbody>
                    </table>
                    <div className="pagination">
                       
                        <button>&lt;</button>
                        <span>1 of 3</span>
                        <button>&gt;</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreatedDailyTaskPage;