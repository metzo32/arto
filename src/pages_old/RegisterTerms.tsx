import { useState } from "react";

interface Agreements {
    termsAgreed: boolean;
    personalInfoAgreed: boolean;
    provisionAgreed: boolean;
    locationAgreed: boolean;
    eventAlarmAgreed: boolean;
    serviceAlarmAgreed: boolean;
  }

export default function RegisterTerms() {
    const [ allAgreed, setAllAgreed ] = useState(false)
    const [ agreements, setAgreements ] = useState({
        termsAgreed: false,
        personalInfoAgreed: false,
        provisionAgreed: false, 
        locationAgreed: false,
        eventAlarmAgreed: false,
        serviceAlarmAgreed: false,
    });

    const handleAgreementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        setAgreements((prevAgreements) => ({ ...prevAgreements, [name]: checked}));
        const allChecked = Object.values({...agreements, [name]: checked}).every(
            (value) => value === true
        );
        setAllAgreed(allChecked)
    };

    const handleAllAgreementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setAgreements((prevAgreements) => {
          const newAgreements = Object.keys(prevAgreements).reduce((acc, key) => {
            (acc as any)[key] = checked;
            return acc;
          }, {} as Agreements);
          setAllAgreed(checked);
          return newAgreements;
        });
      };
      
    return (
        <div>
            <label>회원 정보 입력 및 이용약관 동의</label>
            <ul>
                <li>
                    <input 
                        type="checkbox"
                        id="agree_check_all"
                        name="agree_check_all"
                        checked={allAgreed}
                        onChange={handleAllAgreementChange}
                    />
                    <label htmlFor="agree_check_all">이용약관 전체동의</label>
                </li>
                <li>
                    <input 
                        type="checkbox"
                        id="agree_check_used"
                        name="termsAgreed"
                        required
                        checked={agreements.termsAgreed}
                        onChange={handleAgreementChange}
                    />
                    <label htmlFor="agree_check_used">[필수] 이용약관 동의</label>
                </li>
                <li>
                    <input 
                        type="checkbox"
                        id="agree_check_info"
                        name="personalInfoAgreed"
                        required
                        checked={agreements.personalInfoAgreed}
                        onChange={handleAgreementChange}
                    />
                    <label htmlFor="agree_check_info">[필수] 개인정보 이용 수집 방침</label>
                </li>
                <li>
                    <input 
                        type="checkbox"
                        id="agree_check_info_other"
                        name="provisionAgreed"
                        required
                        checked={agreements.provisionAgreed}
                        onChange={handleAgreementChange}
                    />
                    <label htmlFor="agree_check_info_other">[필수] 개인정보 제 3자 제공 동의</label>
                </li>
                <li>
                    <input 
                        type="checkbox"
                        id="agree_check_pos"
                        name="locationAgreed"
                        required
                        checked={agreements.locationAgreed}
                        onChange={handleAgreementChange}
                    />
                    <label htmlFor="agree_check_pos">[필수] 위치정보 동의</label>
                </li>
                <li>
                    <input 
                        type="checkbox"
                        id="agree_check_event_receive"
                        name="eventAlarmAgreed"                                                                                    
                        checked={agreements.eventAlarmAgreed}
                        onChange={handleAgreementChange}
                    />
                    <label htmlFor="agree_check_event_recieve">[선택] 이벤트 및 혜택 알림 수신 동의</label>
                </li>
                <li>
                    <input 
                        type="checkbox"
                        id="agree_check_push"
                        name="serviceAlarmAgreed"
                        checked={agreements.serviceAlarmAgreed}
                        onChange={handleAgreementChange}
                    />
                    <label htmlFor="agree_check_push">[선택] 서비스 알림 수신 동의</label>
                </li>
                
            </ul>
        </div>
    )
}