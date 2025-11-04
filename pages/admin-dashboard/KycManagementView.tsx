
import React, { useState } from 'react';
import Card from '../../components/Card';
import { KycApplication } from '../../types';
import Icon from '../../components/Icon';

// Fix: Add missing 'submittedDate' property to align with the KycApplication type.
const mockKycApps: KycApplication[] = [
  { userId: 'USR-11A2', userEmail: 'john.doe@email.com', tier: 'Tier 2', documentType: 'Passport', timeInQueue: '15m', status: 'Pending', riskScore: 'Low', submittedDate: '2024-07-21T10:30:00Z' },
  { userId: 'USR-B3C4', userEmail: 'jane.smith@email.com', tier: 'Tier 2', documentType: 'Driver\'s License', timeInQueue: '1h', status: 'Pending', riskScore: 'Medium', submittedDate: '2024-07-21T09:45:00Z' },
  { userId: 'USR-9D5E', userEmail: 'sam.wilson@email.com', tier: 'Tier 1', documentType: 'ID Card', timeInQueue: '3h', status: 'Requires Resubmission', riskScore: 'High', submittedDate: '2024-07-21T07:15:00Z' },
];

const KycManagementView: React.FC = () => {
    const [selectedApp, setSelectedApp] = useState<KycApplication | null>(mockKycApps[1]);

    const getStatusClasses = (status: KycApplication['status']) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'Requires Resubmission': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const getRiskClasses = (risk: KycApplication['riskScore']) => {
        switch(risk) {
            case 'Low': return 'text-success';
            case 'Medium': return 'text-warning';
            case 'High': return 'text-danger';
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <h2 className="text-xl font-bold mb-4">KYC Verification Queue</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-dark-text-secondary">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-bg-secondary dark:text-dark-text-secondary">
                            <tr>
                                <th scope="col" className="px-6 py-3">User ID</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Tier</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Risk</th>
                                {/* Fix: Changed header from "Submitted" to "Time in Queue" to match the data being displayed. */}
                                <th scope="col" className="px-6 py-3">Time in Queue</th>
                            </tr>
                        </thead>
                        <tbody>
                           {mockKycApps.map(app => (
                               <tr key={app.userId} onClick={() => setSelectedApp(app)} className="bg-white border-b dark:bg-dark-card dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg-secondary cursor-pointer">
                                   <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{app.userId}</td>
                                   <td className="px-6 py-4">{app.userEmail}</td>
                                   <td className="px-6 py-4">{app.tier}</td>
                                   <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClasses(app.status)}`}>{app.status}</span></td>
                                   <td className={`px-6 py-4 font-bold ${getRiskClasses(app.riskScore)}`}>{app.riskScore}</td>
                                   <td className="px-6 py-4">{app.timeInQueue}</td>
                               </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {selectedApp && (
                <Card>
                    <h2 className="text-xl font-bold mb-4">Review Application: {selectedApp.userId}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Document Review */}
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="font-semibold">Document Review</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border dark:border-dark-border p-2 rounded-lg">
                                    <p className="text-sm font-medium mb-2">ID Document (Front)</p>
                                    <img src={`https://picsum.photos/seed/${selectedApp.userId}1/400/250`} alt="ID Front" className="rounded"/>
                                </div>
                                <div className="border dark:border-dark-border p-2 rounded-lg">
                                    <p className="text-sm font-medium mb-2">Liveness/Selfie Check</p>
                                    <img src={`https://picsum.photos/seed/${selectedApp.userId}2/400/250`} alt="Selfie" className="rounded"/>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-dark-bg-secondary p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">OCR Extracted Data</h4>
                                <p className="text-sm"><strong>Name:</strong> Jane Smith</p>
                                <p className="text-sm"><strong>DOB:</strong> 1990-05-15</p>
                                <p className="text-sm"><strong>Expires:</strong> 2028-05-14</p>
                            </div>
                        </div>

                        {/* Compliance & Actions */}
                        <div>
                            <h3 className="font-semibold mb-4">Compliance Screening</h3>
                            <div className="space-y-2 text-sm mb-6">
                                <p><strong>Sanctions Check:</strong> <span className="text-success">Clear</span></p>
                                <p><strong>PEP Status:</strong> <span className="text-success">Clear</span></p>
                                <p><strong>Adverse Media:</strong> <span className="text-warning">1 potential match</span></p>
                                <p><strong>Document Tamper Score:</strong> <span className="text-success">Low</span></p>
                            </div>

                            <h3 className="font-semibold mb-2">Actions</h3>
                            <div className="space-y-2">
                                <button className="w-full flex items-center justify-center bg-success/90 text-white py-2 rounded-lg hover:bg-success transition-colors">
                                    <Icon name="check" className="h-5 w-5 mr-2" /> Approve
                                </button>
                                <button className="w-full flex items-center justify-center bg-danger/90 text-white py-2 rounded-lg hover:bg-danger transition-colors">
                                    <Icon name="cross" className="h-5 w-5 mr-2" /> Reject
                                </button>
                                <button className="w-full flex items-center justify-center bg-blue-500/90 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                    <Icon name="refresh" className="h-5 w-5 mr-2" /> Request Resubmission
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default KycManagementView;