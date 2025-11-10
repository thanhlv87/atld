// Firebase Configuration
// TODO: Replace with your actual Firebase config from Firebase Console
// Go to: Firebase Console > Project Settings > Your apps > Web app

const firebaseConfig = {
  apiKey: "AIzaSyBVkNiY3B4yIdCGH4afN8xnrQGP4-U685Q",
  authDomain: "gen-lang-client-0113063590.firebaseapp.com",
  projectId: "gen-lang-client-0113063590",
  storageBucket: "gen-lang-client-0113063590.firebasestorage.app",
  messagingSenderId: "402246586993",
  appId: "1:402246586993:web:a2a3af0df097e2d5ae41d0"
};

// Initialize Firebase
let app, db, auth;

try {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// Helper Functions

// Save business registration
async function saveBusinessRegistration(data) {
    try {
        const docRef = await db.collection('businesses').add({
            ...data,
            status: 'new',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Business saved with ID:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error saving business:', error);
        return { success: false, error: error.message };
    }
}

// Save partner registration
async function savePartnerRegistration(data) {
    try {
        const docRef = await db.collection('partners').add({
            ...data,
            status: 'pending', // pending, approved, rejected
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Partner saved with ID:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error saving partner:', error);
        return { success: false, error: error.message };
    }
}

// Save training request
async function saveTrainingRequest(businessId, data) {
    try {
        const docRef = await db.collection('training_requests').add({
            businessId: businessId,
            ...data,
            status: 'new', // new, quoted, contracted, completed
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Training request saved with ID:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error saving training request:', error);
        return { success: false, error: error.message };
    }
}

// Get all businesses
async function getAllBusinesses() {
    try {
        const snapshot = await db.collection('businesses')
            .orderBy('createdAt', 'desc')
            .get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting businesses:', error);
        return [];
    }
}

// Get all partners
async function getAllPartners(status = null) {
    try {
        let query = db.collection('partners');

        if (status) {
            query = query.where('status', '==', status);
        }

        const snapshot = await query.orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting partners:', error);
        return [];
    }
}

// Get all training requests
async function getAllTrainingRequests(status = null) {
    try {
        let query = db.collection('training_requests');

        if (status) {
            query = query.where('status', '==', status);
        }

        const snapshot = await query.orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting training requests:', error);
        return [];
    }
}

// Update partner status
async function updatePartnerStatus(partnerId, newStatus) {
    try {
        await db.collection('partners').doc(partnerId).update({
            status: newStatus,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating partner status:', error);
        return { success: false, error: error.message };
    }
}

// Update training request status
async function updateTrainingRequestStatus(requestId, newStatus) {
    try {
        await db.collection('training_requests').doc(requestId).update({
            status: newStatus,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating request status:', error);
        return { success: false, error: error.message };
    }
}

// Get statistics for admin dashboard
async function getStatistics() {
    try {
        const [businesses, partners, requests] = await Promise.all([
            db.collection('businesses').get(),
            db.collection('partners').where('status', '==', 'approved').get(),
            db.collection('training_requests').get()
        ]);

        return {
            totalBusinesses: businesses.size,
            totalPartners: partners.size,
            totalRequests: requests.size,
            pendingRequests: requests.docs.filter(doc => doc.data().status === 'new').length
        };
    } catch (error) {
        console.error('Error getting statistics:', error);
        return {
            totalBusinesses: 0,
            totalPartners: 0,
            totalRequests: 0,
            pendingRequests: 0
        };
    }
}

// Sign in admin
async function signInAdmin(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Sign in error:', error);
        return { success: false, error: error.message };
    }
}

// Sign out admin
async function signOutAdmin() {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        console.error('Sign out error:', error);
        return { success: false, error: error.message };
    }
}

// Check auth state
function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}

// Format Firestore timestamp to readable date
function formatTimestamp(timestamp) {
    if (!timestamp) return 'N/A';

    try {
        const date = timestamp.toDate();
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return 'N/A';
    }
}

// Export functions for use in other files
window.FirebaseHelper = {
    saveBusinessRegistration,
    savePartnerRegistration,
    saveTrainingRequest,
    getAllBusinesses,
    getAllPartners,
    getAllTrainingRequests,
    updatePartnerStatus,
    updateTrainingRequestStatus,
    getStatistics,
    signInAdmin,
    signOutAdmin,
    onAuthStateChanged,
    formatTimestamp
};
