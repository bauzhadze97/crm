import Sidebar from '../../components/Sidebar';
import './index.css';

const DailyTaskReportPage = () => {
    return(
        <div className="vacation-dashboard-container">
            <Sidebar/>
            <div className='main-form-container'>
            <div className="form-container">
                <h2 className='page-name'>Daily Task Report</h2>
                <form className="task-report-form">
                    <label htmlFor="reportTitle">Daily Task Report</label>
                    <input
                        type="text"
                        id="reportTitle"
                        name="reportTitle"
                        placeholder="Daily Task Report - IT Department"
                    />

                    <label htmlFor="selectDate">Select Date</label>
                    <input
                        type="date"
                        id="selectDate"
                        name="selectDate"
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter your description here..."
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
export default DailyTaskReportPage