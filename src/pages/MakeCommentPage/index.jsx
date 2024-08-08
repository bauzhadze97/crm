import Sidebar from '../../components/Sidebar';
import './index.css';

const MakeCommentPage = () => {
    return(
        <div className="vacation-dashboard-container">
            <Sidebar/>
            <div className='main-form-container'>
            <div className="form-container">
                <h2 className='page-name'>Daily Task Report Comment</h2>
                <form className="task-report-form">
                <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter your description here..."
                    />
                    <label htmlFor="assign">Add Assign
                        
                    </label>
                    <input
                        type="text"
                        id="assign"
                        name="assign"
                        placeholder="Add Assign "
                    />
                    <label htmlFor="assign">Attach File:</label>
                    <input
                        type="file"
                        id="assign"
                        name="assign"
                        placeholder="Add file "
                    />
                    <label htmlFor="assign">Add Link:</label>
                    <input
                        type="text"
                        id="assign"
                        name="assign"
                        placeholder="Add Link "
                    />
                    <div className='button-container'>
                        <button type="submit">+ Add Comment</button>
                    </div>
                </form>
            </div>
            </div>
            
        </div>
    )
}
export default MakeCommentPage