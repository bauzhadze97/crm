import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import Sidebar from '../../components/Sidebar';
import './index.css';
import html2canvas from 'html2canvas';
import logoImage from '../../assets/signature/logo.png'; 
import signatureImage from '../../assets/signature/signature.png';
import stampImage from '../../assets/signature/stamp.png';

const MakeDocsPage = () => {
  const [salary] = useState('750');
  const [salaryText] = useState('შვიდას ორმოცდაათი');
  const [position] = useState('IT დეპარტამენტი');
  const [id] = useState('61004065900');
  const [name] = useState('მერაბი');
  const [surname] = useState('ბაუჟაძე');
  const [startworkdate] = useState('2023 წლის 18 მარტიდან');
  const [docid] = useState('#776')

  const today = new Date();
  const months = [
    'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 
    'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
  ];
  const currentDate = `${today.getDate()} ${months[today.getMonth()]}, ${today.getFullYear()} წელი`;

  const generatePDF = () => {
    const input = document.getElementById('pdfContent');
    if (!input) return;

    input.style.visibility = 'visible';

    html2canvas(input, {
      useCORS: true,
      logging: true,
      letterRendering: 1,
      scale: 2
    })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('document.pdf');
    })
    .catch((error) => {
      console.error('Error while generating PDF:', error);
    })
    .finally(() => {
      input.style.visibility = 'hidden';
    });
  };

  return (
    <div className="vacation-dashboard-container">
      <Sidebar />
      <div className="main-form-container">
        <div className="form-container">
          <button onClick={generatePDF} className='bg-[#009fe3] w-[20%] h-[50px] rounded text-[#fff] hover:bg-[#009fe388]'>ცნობის გადმოტვირთვა</button>
        </div>
        <div id="pdfContent" style={{ padding: '20px', backgroundColor: 'white', width: '210mm', minHeight: '297mm', margin: '0 auto', visibility: 'hidden'  }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ textAlign: 'left', margin: '40px 0 0 0' }}>
              <p>{docid}</p>
              <p>{currentDate}</p>
              <p>თბილისი</p>
              <p>საჭიროებისამებრ წარსადგენად</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <img src={logoImage} alt="Company Logo" style={{ width: '150px', margin: '0 0 0 150px' }} />
              <h1 style={{ fontSize: '24px', margin: 0 }}>შპს ,,გორგია”</h1>
              <h2 style={{ fontSize: '20px', margin: 0 }}>“GORGIA” LTD.</h2>
              <p style={{ fontSize: '14px', margin: 0 }}>Sokhumi St.10, Batumi, 6002, Georgia</p>
              <p style={{ fontSize: '14px', margin: 0 }}>Tel: +995(32) 2497576; Fax: +995(422) 275872</p>
              <p style={{ fontSize: '14px', margin: 0 }}>E-mail: info@gorgia.ge</p>
            </div>
          </div>
      
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <h2 style={{ fontSize: '20px' }}>ცნობა</h2>
          </div>
          <div style={{ textAlign: 'left', margin: '20px 0' }}>
            <p>ეძლევა <span id="name">{name}</span> <span id="surname">{surname}</span> (პ.ნ <span id="id">{id}</span>) მასზედ, რომ იგი <span id="startworkdate">{startworkdate}</span> დღემდე</p>
            <p>ნამდვილად მუშაობს შპს „გორგიაში“ <span id="position">{position}</span> პოზიციაზე. მისი დარიცხული ხელფასი</p>
            <p>შეადგენს <span id="salary">{salary}</span> (<span id="salaryText">{salaryText}</span>) ლარს.</p>
            <p className='signatureleft'>შპს „გორგიას“ 
            დირექტორის მინდობილი პირი:</p>
          </div>
          <div style={{ textAlign: 'right'}}>
            <p className='signatureright'>/ გ. გორგოშაძე / </p>
            <img src={signatureImage} alt="Company Logo" className='imagesignature'/>
            <img src={stampImage} alt="Company Logo" className='imagestamp' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeDocsPage;
