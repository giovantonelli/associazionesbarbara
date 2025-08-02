// Area Soci JavaScript

// Use global Supabase client instance
const supabaseClient = window.getSupabaseClient();
// Global variables (currentUser is already declared in script.js)
let userRole = null;
// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const loginPrompt = document.getElementById('login-prompt');
const membersContent = document.getElementById('members-content');
const userInfo = document.getElementById('user-info');
const logoutBtn = document.getElementById('logout-btn');
// Utility Functions
function showLoading() {
        if (loginPrompt) loginPrompt.style.display = 'none';
        if (membersContent) membersContent.style.display = 'none';
}

function hideLoading() {
        // Loading screen removed
}

function showLoginPrompt() {
        hideLoading();
        if (loginPrompt) loginPrompt.style.display = 'block';
        if (membersContent) membersContent.style.display = 'none';
}

function showMembersContent() {
hideLoading();
if (loginPrompt) loginPrompt.style.display = 'none';
if (membersContent) {
        membersContent.style.display = 'block';
        membersContent.classList.add('show');
}
// Mostra tutte le sezioni riservate
const dashboardSection = document.querySelector('.dashboard-section');
if (dashboardSection) dashboardSection.style.display = 'block';
document.querySelectorAll('.col-md-3').forEach(el => el.style.display = 'block');
const membersEvents = document.querySelector('.members-events');
if (membersEvents) membersEvents.style.display = 'block';
const membersDocuments = document.querySelector('.members-documents');
if (membersDocuments) membersDocuments.style.display = 'block';
}

        function updateUserInfo(user, metadata) {
                if (!userInfo) return;
                
                // Estrai tutte le informazioni disponibili
                const role = metadata?.role || 'utente';
                const firstName = metadata?.first_name || '';
                const lastName = metadata?.last_name || '';
                const fullName = metadata?.full_name || (firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || 'Utente');
                const phoneNumber = metadata?.phone_number || metadata?.phone || '';
                const dateOfBirth = metadata?.date_of_birth || '';
                const placeOfBirth = metadata?.place_of_birth || '';
                const gender = metadata?.gender || '';
                const fiscalCode = metadata?.fiscal_code || '';
                const address = metadata?.address || '';
                const city = metadata?.city || '';
                const zipCode = metadata?.zip_code || '';
                const province = metadata?.province || '';
                const membershipType1 = metadata?.membership_type1 || '';
                const membershipType2 = metadata?.membership_type2 || '';
                const membershipStatus = metadata?.membership_status || 'attivo';
                const privacyAccepted = metadata?.privacy_accepted || false;
                const createdAt = metadata?.created_at || user.created_at;
                const membershipNumber = metadata?.membership_number || '';
                const membershipDate = metadata?.membership_date || createdAt;
                
                // Formatta lo stato dell'iscrizione per la visualizzazione
                const membershipStatusDisplay = membershipStatus.charAt(0).toUpperCase() + membershipStatus.slice(1);
                const membershipStatusIcon = {
                        'attivo': '✓',
                        'sospeso': '⏸️', 
                        'scaduto': '⚠️',
                        'cancellato': '❌'
                }[membershipStatus] || '❓';
                
                // Calcola giorni dall'ultimo accesso
                const lastSignIn = new Date(user.last_sign_in_at || user.created_at);
                const today = new Date();
                const daysSinceLastAccess = Math.floor((today - lastSignIn) / (1000 * 60 * 60 * 24));
                const lastAccessText = daysSinceLastAccess === 0 ? 'Oggi' : daysSinceLastAccess === 1 ? 'Ieri' : `${daysSinceLastAccess} giorni fa`;
                
                // Costruisci l'indirizzo completo se disponibile
                const fullAddress = [address, city, zipCode, province].filter(Boolean).join(', ');
                
                userInfo.innerHTML = `
                        <div class="user-card">
                                <div class="user-details">
                                        <h3>${fullName}</h3>
                                        <p class="user-email">📧 ${user.email}</p>
                                        ${phoneNumber ? `<p class="user-phone">📞 ${phoneNumber}</p>` : ''}
                                        ${fiscalCode ? `<p class="user-fiscal">🇨🇵 CF: ${fiscalCode}</p>` : ''}
                                        <span class="user-role ${role}">${role === 'socio' ? 'Socio' : role === 'admin' ? 'Amministratore' : 'Utente'}</span>
                                </div>
                        </div>
                        
                        <div class="user-stats">
                                <div class="stat">
                                        <span class="stat-label">Ultimo accesso</span>
                                        <span class="stat-value">${lastAccessText}</span>
                                </div>
                                <div class="stat">
                                        <span class="stat-label">Stato iscrizione</span>
                                        <span class="stat-value">${membershipStatusIcon} ${membershipStatusDisplay}</span>
                                </div>
                                ${membershipDate ? `
                                <div class="stat">
                                        <span class="stat-label">Socio dal</span>
                                        <span class="stat-value">${new Date(membershipDate).toLocaleDateString('it-IT')}</span>
                                </div>` : ''}
                                ${membershipType1 || membershipType2 ? `
                                <div class="stat">
                                        <span class="stat-label">Tipo socio</span>
                                        <span class="stat-value">${[membershipType1, membershipType2].filter(Boolean).join(' + ')}</span>
                                </div>` : ''}
                                ${membershipNumber ? `
                                <div class="stat">
                                        <span class="stat-label">N. Tessera</span>
                                        <span class="stat-value">${membershipNumber}</span>
                                </div>` : ''}
                        </div>
                        
                        ${dateOfBirth || placeOfBirth || gender || fullAddress ? `
                        <div class="user-additional-info" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                                <h4 style="margin-bottom: 15px; color: rgba(255,255,255,0.9);">👤 Dati Personali</h4>
                                ${dateOfBirth ? `
                                <p style="margin-bottom: 10px; opacity: 0.9;">
                                        <strong>🎂 Data di nascita:</strong> ${new Date(dateOfBirth).toLocaleDateString('it-IT')}
                                </p>` : ''}
                                ${placeOfBirth ? `
                                <p style="margin-bottom: 10px; opacity: 0.9;">
                                        <strong>🏠 Luogo di nascita:</strong> ${placeOfBirth}
                                </p>` : ''}
                                ${gender ? `
                                <p style="margin-bottom: 10px; opacity: 0.9;">
                                        <strong>👥 Genere:</strong> ${gender === 'M' ? 'Maschio' : gender === 'F' ? 'Femmina' : gender}
                                </p>` : ''}
                                ${fullAddress ? `
                                <p style="margin-bottom: 10px; opacity: 0.9;">
                                        <strong>📍 Indirizzo:</strong> ${fullAddress}
                                </p>` : ''}
                                ${privacyAccepted ? `
                                <p style="margin-bottom: 10px; opacity: 0.9;">
                                        <strong>⚖️ Privacy:</strong> ✓ Accettata
                                </p>` : `
                                <p style="margin-bottom: 10px; opacity: 0.9; color: #ffeb3b;">
                                        <strong>⚖️ Privacy:</strong> ❌ Non accettata
                                </p>`}
                        </div>` : ''}
                `;
                }
                // Authentication Functions
                async function checkAuthentication() {
                        showLoading();
                        try {
                                // Get current session
                                const {
                                        data: {
                                                session
                                        },
                                        error
                                } = await supabaseClient.auth.getSession();
                                if (error) {
                                        console.error('Error checking session:', error);
                                        showLoginPrompt();
                                        return;
                                }
                                if (!session || !session.user) {
                                        // No active session, redirect to login
                                        setTimeout(() => {
                                                window.location.href = 'login.html';
                                        }, 1000);
                                        return;
                                }
                                // Check if email is confirmed
                                if (!session.user.email_confirmed_at) {
                                        showLoginPrompt();
                                        if (loginPrompt) {
                                                loginPrompt.innerHTML = `
                                                
                        
                        
                                                                <div class="auth-prompt">
                                                                        <h2>📧 Email non confermata</h2>
                                                                        <p>Il tuo account non è ancora stato confermato.</p>
                                                                        <p>Controlla la tua casella di posta e clicca sul link di conferma.</p>
                                                                        <div class="auth-actions">
                                                                                <button onclick="resendConfirmation()" class="btn btn-primary">Invia di nuovo email</button>
                                                                                <a href="login.html" class="btn btn-secondary">Torna al Login</a>
                                                                        </div>
                                                                </div>
                                        `;
                                        }
                                        return;
                                }
                                // User is authenticated and confirmed
                                currentUser = session.user;
                                let userMetadata = session.user.user_metadata;
                                userRole = userMetadata?.role || 'utente';
                                // Try to fetch additional user profile data from profiles table
                                try {
const {
data: profileData,
error: profileError
} = await supabaseClient.from('profiles').select('*').eq('id', session.user.id).single();
                                        if (!profileError && profileData) {
                                                // Merge profile data with user metadata
                                                userMetadata = {
                                                        ...userMetadata,
                                                        ...profileData
                                                };
                                                userRole = profileData.role || userMetadata?.role || 'utente';
                                        }
                                } catch (profileError) {
                                        // Continue with just the metadata from auth
                                }
                                // Check if user has access (socio role)
                                if (userRole !== 'socio') {
                                        showLoginPrompt();
                                        if (loginPrompt) {
                                                loginPrompt.innerHTML = `
                                                
                        
                        
                                                                <div class="auth-prompt">
                                                                        <h2>🔒 Accesso Limitato</h2>
                                                                        <p>Il tuo account è attivo ma non hai i permessi per accedere all'area soci.</p>
                                                                        <p>Contatta l'amministrazione per richiedere l'attivazione come socio.</p>
                                                                        <div class="contact-info">
                                                                                <p>📧 
                                        
                                        
                                                                                        <strong>Email:</strong> info@associazionesbarbara.it
                                
                                
                                                                                </p>
                                                                                <p>🏢 
                                        
                                        
                                                                                        <strong>Sede:</strong> Via N. Mastroserio 12, Grumo Appula (BA)
                                
                                
                                                                                </p>
                                                                        </div>
                                                                        <div class="auth-actions">
                                                                                <button onclick="handleLogout()" class="btn btn-secondary">Logout</button>
                                                                                <a href="index.html" class="btn btn-primary">Torna alla Home</a>
                                                                        </div>
                                                                </div>
                                        `;
                                        }
                                        return;
                                }
                                // User has access, show members content
                                updateUserInfo(currentUser, userMetadata);
                                showMembersContent();
                        } catch (error) {
                                console.error('Authentication check failed:', error);
                                showLoginPrompt();
                        }
                }
                // Resend confirmation email
                async function resendConfirmation() {
                        try {
                                const {
                                        error
                                } = await supabaseClient.auth.resend({
                                        type: 'signup',
                                        email: currentUser?.email
                                });
                                if (error) {
                                        notify.error('Errore nell\'invio dell\'email: ' + error.message);
                                } else {
                                        notify.success('Email di conferma inviata! Controlla la tua casella di posta.');
                                }
                        } catch (error) {
                                console.error('Error resending confirmation:', error);
                                notify.error('Errore nell\'invio dell\'email di conferma.');
                        }
                }
                // Logout function
                async function handleLogout() {
                        try {
                                const {
                                        error
                                } = await supabaseClient.auth.signOut();
                                if (error) {
                                        console.error('Logout error:', error);
                                        notify.error('Errore durante il logout: ' + error.message);
                                } else {
                                        notify.info('Logout effettuato con successo. Arrivederci!');
                                        // Redirect to home page after successful logout
                                        setTimeout(() => {
                                                window.location.href = 'index.html';
                                        }, 1000);
                                }
                        } catch (error) {
                                console.error('Logout failed:', error);
                                notify.error('Errore durante il logout.');
                        }
                }
                // Auth state change listener
                supabaseClient.auth.onAuthStateChange((event, session) => {
                        if (event === 'SIGNED_OUT' || !session) {
                                // User signed out or session expired
                                window.location.href = 'login.html';
                        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                                // User signed in or token refreshed
                                checkAuthentication();
                        }
                });
                // Profile Management Functions

                function hideAllForms() {
                        const editForm = document.getElementById('profile-edit-form');
                        const passwordForm = document.getElementById('password-change-form');
                        const emailForm = document.getElementById('email-change-form');
                        if (editForm) editForm.style.display = 'none';
                        if (passwordForm) passwordForm.style.display = 'none';
                        if (emailForm) emailForm.style.display = 'none';
                        // Rimuovi stato attivo da tutti i pulsanti
                        document.getElementById('edit-profile-btn')?.classList.remove('btn-active');
                        document.getElementById('change-password-btn')?.classList.remove('btn-active');
                        document.getElementById('change-email-btn')?.classList.remove('btn-active');
                }

                function showEditProfile() {
                        hideAllForms();
                        const editForm = document.getElementById('profile-edit-form');
                        const btn = document.getElementById('edit-profile-btn');
                        if (editForm) {
                                editForm.style.display = 'block';
                                populateEditForm();
                        }
                        if (btn) btn.classList.add('btn-active');
                }

                function hideEditProfile() {
                        const editForm = document.getElementById('profile-edit-form');
                        if (editForm) editForm.style.display = 'none';
                }

                function showChangePassword() {
                        hideAllForms();
                        const passwordForm = document.getElementById('password-change-form');
                        const btn = document.getElementById('change-password-btn');
                        if (passwordForm) passwordForm.style.display = 'block';
                        if (btn) btn.classList.add('btn-active');
                }

                function hideChangePassword() {
                        const passwordForm = document.getElementById('password-change-form');
                        if (passwordForm) passwordForm.style.display = 'none';
                }

                function showChangeEmail() {
                        hideAllForms();
                        const emailForm = document.getElementById('email-change-form');
                        const btn = document.getElementById('change-email-btn');
                        if (emailForm) emailForm.style.display = 'block';
                        if (btn) btn.classList.add('btn-active');
                }
                
                function populateEditForm() {
                        if (!currentUser) return;
                        // Usa user_metadata già merge-ato con i dati del profilo (come fatto in checkAuthentication)
                        const metadata = currentUser.user_metadata || {};
                        // Informazioni Personali
                        document.getElementById('edit-firstName').value = metadata.first_name || '';
                        document.getElementById('edit-lastName').value = metadata.last_name || '';
                        document.getElementById('edit-dateOfBirth').value = metadata.date_of_birth || '';
                        document.getElementById('edit-placeOfBirth').value = metadata.place_of_birth || '';
                        document.getElementById('edit-gender').value = metadata.gender || '';
                        document.getElementById('edit-fiscalCode').value = metadata.fiscal_code || '';
                        // Contatti
                        document.getElementById('edit-phone').value = metadata.phone_number || metadata.phone || '';
                        // Indirizzo
                        document.getElementById('edit-address').value = metadata.address || '';
                        document.getElementById('edit-city').value = metadata.city || '';
                        document.getElementById('edit-zipCode').value = metadata.zip_code || '';
                        document.getElementById('edit-province').value = metadata.province || '';
                }
                
                async function handleProfileUpdate(event) {
                        event.preventDefault();
                        
                        const submitBtn = event.target.querySelector('button[type="submit"]');
                        const originalText = submitBtn.innerHTML;
                        
                        // Show loading state
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '💾 Salvando...';
                        
                        const formData = new FormData(event.target);
                        
                        // Validate fiscal code format if provided
                        const fiscalCode = formData.get('fiscalCode')?.toUpperCase().trim();
                        if (fiscalCode && !/^[A-Z0-9]{16}$/.test(fiscalCode)) {
                                notify.error('Il codice fiscale deve essere di 16 caratteri alfanumerici');
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = originalText;
                                return;
                        }
                        
                        // Validate ZIP code format if provided
                        const zipCode = formData.get('zipCode');
                        if (zipCode && !/^\d{5}$/.test(zipCode)) {
                                notify.error('Il CAP deve essere di 5 cifre');
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = originalText;
                                return;
                        }
                        
                        // Validate province format if provided
                        const province = formData.get('province')?.toUpperCase().trim();
                        if (province && !/^[A-Z]{2}$/.test(province)) {
                                notify.error('La provincia deve essere di 2 lettere maiuscole');
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = originalText;
                                return;
                        }
                        
                        const updateData = {
                                // Informazioni Personali
                                first_name: formData.get('firstName'),
                                last_name: formData.get('lastName'),
                                date_of_birth: formData.get('dateOfBirth') || null,
                                place_of_birth: formData.get('placeOfBirth') || null,
                                gender: formData.get('gender') || null,
                                fiscal_code: fiscalCode || null,
                                
                                // Contatti
                                phone_number: formData.get('phone') || null,
                                phone: formData.get('phone') || null, // Keep both for compatibility
                                
                                // Indirizzo
                                address: formData.get('address') || null,
                                city: formData.get('city') || null,
                                zip_code: zipCode || null,
                                province: province || null,
                                
                        };
                        
                        try {
                                // Update user metadata in Supabase Auth
                                const { error: authError } = await supabaseClient.auth.updateUser({
                                        data: updateData
                                });
                                
                                if (authError) throw authError;
                                
                                // Also try to update profiles table if it exists
                                try {
                                        const profileUpdateData = {
                                                first_name: updateData.first_name,
                                                last_name: updateData.last_name,
                                                date_of_birth: updateData.date_of_birth,
                                                place_of_birth: updateData.place_of_birth,
                                                gender: updateData.gender,
                                                fiscal_code: updateData.fiscal_code,
                                                phone: updateData.phone_number,
                                                address: updateData.address,
                                                city: updateData.city,
                                                zip_code: updateData.zip_code,
                                                province: updateData.province,
                                                updated_at: new Date().toISOString()
                                        };
                                        
                                        const { error: profileError } = await supabaseClient
                                                .from('profiles')
                                                .update(profileUpdateData)
                                                .eq('id', currentUser.id);
                                                
                                        if (profileError) {
                                                console.warn('Profile table update failed:', profileError);
                                                // Don't throw error - auth update succeeded
                                        }
                                } catch (profileError) {
                                        console.warn('Profiles table not accessible:', profileError);
                                        // Continue - auth metadata update succeeded
                                }
                                
                                notify.success('Profilo aggiornato con successo!');
                                hideEditProfile();
                                // Refresh user info
                                checkAuthentication();
                                
                        } catch (error) {
                                console.error('Profile update error:', error);
                                notify.error('Errore durante l\'aggiornamento del profilo: ' + error.message);
                        } finally {
                                // Reset button state
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = originalText;
                        }
                }
                
                async function handlePasswordChange(event) {
                        event.preventDefault();
                        
                        const submitBtn = event.target.querySelector('button[type="submit"]');
                        const originalText = submitBtn.innerHTML;
                        
                        const formData = new FormData(event.target);
                        const currentPassword = formData.get('currentPassword');
                        const newPassword = formData.get('newPassword');
                        const confirmPassword = formData.get('confirmPassword');
                        
                        // Validate passwords match
                        if (newPassword !== confirmPassword) {
                                notify.error('Le password non coincidono');
                                return;
                        }
                        
                        // Validate password length
                        if (newPassword.length < 6) {
                                notify.error('La password deve essere lunga almeno 6 caratteri');
                                return;
                        }
                        
                        // Show loading state
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '🔄 Cambiando...';
                        
                        try {
                                const { error } = await supabaseClient.auth.updateUser({
                                        password: newPassword
                                });
                                
                                if (error) throw error;
                                
                                notify.success('Password cambiata con successo!');
                                hideChangePassword();
                                
                                // Clear form
                                document.getElementById('update-password-form').reset();
                                
                        } catch (error) {
                                console.error('Password change error:', error);
                                notify.error('Errore durante il cambio password: ' + error.message);
                        } finally {
                                // Reset button state
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = originalText;
                        }
                }

                // Event Listeners
                document.addEventListener('DOMContentLoaded', function() {
                        // Add logout button event listener
                        if (logoutBtn) {
                                logoutBtn.addEventListener('click', handleLogout);
                        }
                        
                        // Profile management buttons
                        const editProfileBtn = document.getElementById('edit-profile-btn');
                        const changePasswordBtn = document.getElementById('change-password-btn');
                        const cancelEditBtn = document.getElementById('cancel-edit-btn');
                        const cancelPasswordBtn = document.getElementById('cancel-password-btn');
                        const updateProfileForm = document.getElementById('update-profile-form');
                        const updatePasswordForm = document.getElementById('update-password-form');
                        
                        if (editProfileBtn) {
                                editProfileBtn.addEventListener('click', showEditProfile);
                        }
                        if (changePasswordBtn) {
                                changePasswordBtn.addEventListener('click', showChangePassword);
                        }
                        const changeEmailBtn = document.getElementById('change-email-btn');
                        if (changeEmailBtn) {
                                changeEmailBtn.addEventListener('click', showChangeEmail);
                        }
                        if (cancelEditBtn) {
                                cancelEditBtn.addEventListener('click', hideEditProfile);
                        }
                        if (cancelPasswordBtn) {
                                cancelPasswordBtn.addEventListener('click', hideChangePassword);
                        }
                        if (updateProfileForm) {
                                updateProfileForm.addEventListener('submit', handleProfileUpdate);
                        }
                        if (updatePasswordForm) {
                                updatePasswordForm.addEventListener('submit', handlePasswordChange);
                        }
                        
                        // Check authentication on page load
                        checkAuthentication();
                        
                        // Events management initialization
                        initializeEventsManagement();
                });
                
                // Events Management Functions
                let allUsers = [];
                let currentEditingEventId = null;
                
                async function initializeEventsManagement() {
                        // Load users for the dropdown
                        await loadUsers();
                        
                        // Setup event listeners for events management
                        setupEventsEventListeners();
                        
                        // Load events list
                        await loadEventsList();
                        
                        // Initialize users management
                        await initializeUsersManagement();
                }
                
                async function loadUsers() {
                        try {
                                // Try to load from profiles table first
                                let { data: profiles, error: profilesError } = await supabaseClient
                                        .from('profiles')
                                        .select('id, first_name, last_name, email');
                                
                                if (profilesError) {
                                        console.warn('Cannot access profiles table:', profilesError);
                                        // Fallback: use auth metadata if available
                                        allUsers = [];
                                        return;
                                }
                                
                                allUsers = profiles || [];
                                populateUsersDropdown();
                                
                        } catch (error) {
                                console.error('Error loading users:', error);
                                allUsers = [];
                        }
                }
                
                function populateUsersDropdown() {
                        const dropdown = document.getElementById('event-created-by');
                        if (!dropdown) return;
                        
                        // Clear existing options except the first one
                        while (dropdown.children.length > 1) {
                                dropdown.removeChild(dropdown.lastChild);
                        }
                        
                        // Add current user as default
                        if (currentUser) {
                                const currentUserOption = document.createElement('option');
                                currentUserOption.value = currentUser.id;
                                currentUserOption.textContent = getUserDisplayName(currentUser);
                                currentUserOption.selected = true;
                                dropdown.appendChild(currentUserOption);
                        }
                        
                        // Add other users
                        allUsers.forEach(user => {
                                if (user.id !== currentUser?.id) {
                                        const option = document.createElement('option');
                                        option.value = user.id;
                                        option.textContent = getUserDisplayName(user);
                                        dropdown.appendChild(option);
                                }
                        });
                }
                
                function getUserDisplayName(user) {
                        if (user.first_name && user.last_name) {
                                return `${user.first_name} ${user.last_name}`;
                        }
                        if (user.first_name) return user.first_name;
                        if (user.last_name) return user.last_name;
                        return user.email || 'Utente senza nome';
                }
                
                function setupEventsEventListeners() {
                        // Tab switching
                        const showEventsListBtn = document.getElementById('show-events-list');
                        const showCreateEventBtn = document.getElementById('show-create-event');
                        
                        if (showEventsListBtn) {
                                showEventsListBtn.addEventListener('click', () => switchToEventsTab('list'));
                        }
                        if (showCreateEventBtn) {
                                showCreateEventBtn.addEventListener('click', () => switchToEventsTab('form'));
                        }
                        
                        // Form handling
                        const eventForm = document.getElementById('event-management-form');
                        const cancelFormBtn = document.getElementById('cancel-event-form');
                        const deleteEventBtn = document.getElementById('delete-event-btn');
                        
                        if (eventForm) {
                                eventForm.addEventListener('submit', handleEventSubmit);
                        }
                        if (cancelFormBtn) {
                                cancelFormBtn.addEventListener('click', cancelEventForm);
                        }
                        if (deleteEventBtn) {
                                deleteEventBtn.addEventListener('click', handleEventDelete);
                        }
                }
                
                function switchToEventsTab(tab) {
                        const listSection = document.getElementById('events-list-section');
                        const formSection = document.getElementById('event-form-section');
                        const listBtn = document.getElementById('show-events-list');
                        const formBtn = document.getElementById('show-create-event');
                        
                        if (tab === 'list') {
                                listSection.style.display = 'block';
                                formSection.style.display = 'none';
                                listBtn.classList.add('active-tab');
                                listBtn.classList.remove('btn-outline');
                                listBtn.classList.add('btn-primary');
                                formBtn.classList.remove('active-tab');
                                formBtn.classList.add('btn-outline');
                                formBtn.classList.remove('btn-primary');
                        } else {
                                listSection.style.display = 'none';
                                formSection.style.display = 'block';
                                formBtn.classList.add('active-tab');
                                formBtn.classList.remove('btn-outline');
                                formBtn.classList.add('btn-primary');
                                listBtn.classList.remove('active-tab');
                                listBtn.classList.add('btn-outline');
                                listBtn.classList.remove('btn-primary');
                                
                                // Reset form for new event
                                if (!currentEditingEventId) {
                                        resetEventForm();
                                }
                        }
                }
                
                async function loadEventsList() {
                        try {
                                const { data: events, error } = await supabaseClient
                                        .from('events')
                                        .select('*')
                                        .order('event_date', { ascending: false });
                                
                                if (error) throw error;
                                
                                renderEventsTable(events || []);
                                
                        } catch (error) {
                                console.error('Error loading events:', error);
                                notify.error('Errore nel caricamento degli eventi: ' + error.message);
                        }
                }
                
                function renderEventsTable(events) {
                        const tbody = document.getElementById('admin-events-tbody');
                        const noEventsMessage = document.getElementById('no-events-message');
                        
                        if (!tbody) {
                                console.error('Table tbody not found!');
                                return;
                        }
                        
                        if (events.length === 0) {
                                tbody.innerHTML = '';
                                if (noEventsMessage) noEventsMessage.style.display = 'block';
                                return;
                        }
                        
                        if (noEventsMessage) noEventsMessage.style.display = 'none';
                        
                        tbody.innerHTML = events.map(event => `
                                <tr style="border-bottom: 1px solid #ddd;">
                                        <td class="event-title" style="padding: 12px; border: 1px solid #ddd; font-weight: 600; color: #e10600; word-wrap: break-word; max-width: 250px;">${escapeHtml(event.title || '')}</td>
                                        <td class="event-date" style="padding: 12px; border: 1px solid #ddd; white-space: nowrap; text-align: center; color: #333; font-weight: 500;">${formatDate(event.event_date)}</td>
                                        <td style="padding: 12px; border: 1px solid #ddd; word-wrap: break-word; max-width: 200px; text-align: center;">${escapeHtml(event.location || '-')}</td>
                                        <td class="event-public" style="padding: 12px; border: 1px solid #ddd; text-align: center; white-space: nowrap;">${event.is_public ? '✅ Sì' : '❌ No'}</td>
                                        <td class="event-actions" style="padding: 8px; border: 1px solid #ddd; text-align: center; white-space: nowrap;">
                                                <button onclick="editEvent('${event.id}')" class="btn-sm btn-edit" style="padding: 6px 12px; margin-right: 8px; margin-bottom: 0; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; display: inline-block; text-decoration: none; outline: none;">✏️ Modifica</button>
                                                <button onclick="deleteEvent('${event.id}')" class="btn-sm btn-delete" style="padding: 6px 12px; margin-bottom: 0; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; display: inline-block; text-decoration: none; outline: none;">🗑️ Elimina</button>
                                        </td>
                                </tr>
                        `).join('');
                }
                
                function formatDate(dateString) {
                        if (!dateString || dateString === null || dateString === undefined) {
                                return '-';
                        }
                        try {
                                // Gestione formato ISO (YYYY-MM-DD)
                                if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
                                        const [year, month, day] = dateString.split('-');
                                        return `${day}/${month}/${year}`;
                                }
                                // Gestione formato con orario (YYYY-MM-DDTHH:mm:ss)
                                if (/^\d{4}-\d{2}-\d{2}T/.test(dateString)) {
                                        const date = new Date(dateString);
                                        if (!isNaN(date.getTime())) {
                                                return date.toLocaleDateString('it-IT');
                                        }
                                }
                                // Fallback generico
                                const date = new Date(dateString);
                                if (!isNaN(date.getTime())) {
                                        return date.toLocaleDateString('it-IT');
                                }
                                return dateString;
                        } catch (error) {
                                return dateString || '-';
                        }
                }
                
                function getStatusLabel(status) {
                        return '';
                }
                
                function escapeHtml(text) {
                        const div = document.createElement('div');
                        div.textContent = text;
                        return div.innerHTML;
                }
                
                function resetEventForm() {
                        const form = document.getElementById('event-management-form');
                        const title = document.getElementById('event-form-title');
                        const deleteBtn = document.getElementById('delete-event-btn');
                        
                        if (form) form.reset();
                        if (title) title.textContent = '➕ Nuovo Evento';
                        if (deleteBtn) deleteBtn.style.display = 'none';
                        
                        currentEditingEventId = null;
                        
                        // Set default values
                        const isPublicCheckbox = document.getElementById('event-is-public');
                        const createdBySelect = document.getElementById('event-created-by');
                        
                        if (isPublicCheckbox) isPublicCheckbox.checked = true;
                        if (createdBySelect && currentUser) createdBySelect.value = currentUser.id;
                }
                
                function cancelEventForm() {
                        resetEventForm();
                        switchToEventsTab('list');
                }
                
                async function handleEventSubmit(event) {
                        event.preventDefault();
                        
                        const submitBtn = document.getElementById('save-event-btn');
                        const originalText = submitBtn.innerHTML;
                        
                        // Show loading state
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = '💾 Salvando...';
                        
                        try {
                                const formData = new FormData(event.target);
                                
                                // Validation
                                if (!formData.get('title')?.trim()) {
                                        throw new Error('Il titolo è obbligatorio');
                                }
                                if (!formData.get('event_date')) {
                                        throw new Error('La data è obbligatoria');
                                }
                                
                                const eventData = {
                                        title: formData.get('title').trim(),
                                        description: formData.get('description')?.trim() || null,
                                        content: formData.get('content')?.trim() || null,
                                        event_date: formData.get('event_date'),
                                        event_time: formData.get('event_time')?.trim() || null,
                                        location: formData.get('location')?.trim() || null,
                                        address: formData.get('address')?.trim() || null,
                                        image_url: formData.get('image_url')?.trim() || null,
                                        created_by: formData.get('created_by') || currentUser?.id,
                                        is_public: formData.get('is_public') === 'on',
                                        updated_at: new Date().toISOString()
                                };
                                
                                let result;
                                if (currentEditingEventId) {
                                        // Update existing event
                                        result = await supabaseClient
                                                .from('events')
                                                .update(eventData)
                                                .eq('id', currentEditingEventId);
                                } else {
                                        // Create new event
                                        eventData.created_at = new Date().toISOString();
                                        result = await supabaseClient
                                                .from('events')
                                                .insert([eventData]);
                                }
                                
                                if (result.error) throw result.error;
                                
                                notify.success(currentEditingEventId ? 'Evento aggiornato con successo!' : 'Evento creato con successo!');
                                
                                // Refresh events list and switch to list view
                                await loadEventsList();
                                switchToEventsTab('list');
                                
                        } catch (error) {
                                console.error('Error saving event:', error);
                                notify.error('Errore nel salvataggio: ' + error.message);
                        } finally {
                                // Reset button state
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = originalText;
                        }
                }
                
                async function editEvent(eventId) {
                        try {
                                const { data: event, error } = await supabaseClient
                                        .from('events')
                                        .select('*')
                                        .eq('id', eventId)
                                        .single();
                                
                                if (error) throw error;
                                
                                // Populate form with event data
                                currentEditingEventId = eventId;
                                populateEventForm(event);
                                
                                // Switch to form view
                                switchToEventsTab('form');
                                
                                // Update form title and show delete button
                                const title = document.getElementById('event-form-title');
                                const deleteBtn = document.getElementById('delete-event-btn');
                                
                                if (title) title.textContent = '✏️ Modifica Evento';
                                if (deleteBtn) deleteBtn.style.display = 'inline-block';
                                
                        } catch (error) {
                                console.error('Error loading event for edit:', error);
                                notify.error('Errore nel caricamento dell\'evento: ' + error.message);
                        }
                }
                
                function populateEventForm(event) {
                        document.getElementById('event-id').value = event.id || '';
                        document.getElementById('event-title').value = event.title || '';
                        document.getElementById('event-description').value = event.description || '';
                        document.getElementById('event-content').value = event.content || '';
                        document.getElementById('event-date').value = event.event_date || '';
                        document.getElementById('event-time').value = event.event_time || '';
                        document.getElementById('event-location').value = event.location || '';
                        document.getElementById('event-address').value = event.address || '';
                        document.getElementById('event-image-url').value = event.image_url || '';
                        document.getElementById('event-created-by').value = event.created_by || '';
                        document.getElementById('event-is-public').checked = event.is_public !== false;
                }
                
                async function deleteEvent(eventId) {
                        if (!confirm('Sei sicuro di voler eliminare questo evento? Questa azione non può essere annullata.')) {
                                return;
                        }
                        
                        try {
                                const { error } = await supabaseClient
                                        .from('events')
                                        .delete()
                                        .eq('id', eventId);
                                
                                if (error) throw error;
                                
                                notify.success('Evento eliminato con successo!');
                                await loadEventsList();
                                
                                // If we were editing this event, switch back to list
                                if (currentEditingEventId === eventId) {
                                        switchToEventsTab('list');
                                }
                                
                        } catch (error) {
                                console.error('Error deleting event:', error);
                                notify.error('Errore nell\'eliminazione: ' + error.message);
                        }
                }
                
                async function handleEventDelete() {
                        if (currentEditingEventId) {
                                await deleteEvent(currentEditingEventId);
                        }
                }
                
                // Make functions globally available for onclick handlers
                window.editEvent = editEvent;
                window.deleteEvent = deleteEvent;
                
                // Users Management Functions
                async function loadUsersList() {
                        try {
                                // Load users from profiles table
                                const { data: profiles, error: profilesError } = await supabaseClient
                                        .from('profiles')
                                        .select('*')
                                        .order('created_at', { ascending: false });

                                if (profilesError) {
                                        console.error('Error loading profiles:', profilesError);
                                        throw profilesError;
                                }

                                console.log('Loaded profiles:', profiles);
                                displayUsersList(profiles || []);
                                
                        } catch (error) {
                                console.error('Error loading users:', error);
                                document.getElementById('users-table').innerHTML = 
                                        '<p style="text-align: center; padding: 20px; color: #e74c3c;">Errore nel caricamento degli utenti: ' + error.message + '</p>';
                        }
                }

                function displayUsersList(users) {
                        const usersTable = document.getElementById('users-table');
                        
                        if (!users || users.length === 0) {
                                usersTable.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">Nessun utente trovato.</p>';
                                return;
                        }

                        let tableHTML = `
                                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                        <thead style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                                                <tr>
                                                        <th style="padding: 15px; text-align: left; font-weight: 600;">Nome</th>
                                                        <th style="padding: 15px; text-align: left; font-weight: 600;">Email</th>
                                                        <th style="padding: 15px; text-align: center; font-weight: 600;">Telefono</th>
                                                        <th style="padding: 15px; text-align: center; font-weight: 600;">Ruolo</th>
                                                        <th style="padding: 15px; text-align: center; font-weight: 600;">Tipo Socio</th>
                                                        <th style="padding: 15px; text-align: center; font-weight: 600;">Registrato</th>
                                                        <th style="padding: 15px; text-align: center; font-weight: 600;">Azioni</th>
                                                </tr>
                                        </thead>
                                        <tbody>
                        `;

                        users.forEach((user, index) => {
                                const fullName = user.full_name || 
                                                (user.first_name && user.last_name ? 
                                                 `${user.first_name} ${user.last_name}` : 
                                                 user.first_name || user.last_name || 'Nome non disponibile');
                                
                                const email = user.email || 'Email non disponibile';
                                const phone = user.phone_number || '-';
                                const role = user.role || 'utente';
                                const membershipType = user.membership_type1 || user.membership_type2 || '-';
                                const membershipStatus = user.membership_status || 'attivo';
                                // Capitalize first letter for display
                                const membershipStatusDisplay = membershipStatus.charAt(0).toUpperCase() + membershipStatus.slice(1);
                                const privacyAccepted = user.privacy_accepted ? '✅' : '❌';
                                const createdAt = user.created_at ? new Date(user.created_at).toLocaleDateString('it-IT') : 'N/D';
                                const userId = user.id; // Use only id field
                                console.log(`User ${index}: ID=${user.id}, using=${userId}`);
                                
                                const rowStyle = index % 2 === 0 ? 'background-color: #f8f9fa;' : 'background-color: white;';
                                
                                tableHTML += `
                                        <tr style="${rowStyle}">
                                                <td style="padding: 12px; border: 1px solid #ddd;">
                                                        <strong>${escapeHtml(fullName)}</strong>
                                                        ${user.date_of_birth ? `<br><small style="color: #666;">Nato il: ${new Date(user.date_of_birth).toLocaleDateString('it-IT')}</small>` : ''}
                                                </td>
                                                <td style="padding: 12px; border: 1px solid #ddd;">
                                                        ${escapeHtml(email)}
                                                        ${user.city ? `<br><small style="color: #666;">${escapeHtml(user.city)}</small>` : ''}
                                                </td>
                                                <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
                                                        ${escapeHtml(phone)}
                                                </td>
                                                <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
                                                        <select onchange="updateUserRole('${userId}', this.value)" 
                                                                style="padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; background: white;">
                                                                <option value="utente" ${role === 'utente' ? 'selected' : ''}>Utente</option>
                                                                <option value="socio" ${role === 'socio' ? 'selected' : ''}>Socio</option>
                                                                <option value="admin" ${role === 'admin' ? 'selected' : ''}>Admin</option>
                                                        </select>
                                                </td>
                                                <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
                                                        ${escapeHtml(membershipType)}
                                                </td>
                                                <td style="padding: 12px; border: 1px solid #ddd; text-align: center;">
                                                        ${createdAt}
                                                </td>
                                                <td class="user-actions" style="padding: 8px; border: 1px solid #ddd; text-align: center; white-space: nowrap;">
                                                        <button onclick="editUserProfile('${userId}')" 
                                                                class="btn-sm btn-edit" 
                                                                style="padding: 4px 8px; margin-right: 4px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; text-decoration: none; outline: none;">
                                                                ✏️ Modifica
                                                        </button>
                                                        <button onclick="deleteUser('${userId}')" 
                                                                class="btn-sm btn-delete" 
                                                                style="padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; text-decoration: none; outline: none;">
                                                                🗑️ Elimina
                                                        </button>
                                                </td>
                                        </tr>
                                `;
                        });

                        tableHTML += `
                                        </tbody>
                                </table>
                        `;

                        usersTable.innerHTML = tableHTML;
                }

                async function updateUserRole(userId, newRole) {
                        try {
                                // Update role in profiles table
                                const { error } = await supabaseClient
                                        .from('profiles')
                                        .update({ role: newRole, updated_at: new Date().toISOString() })
                                        .eq('id', userId);

                                if (error) throw error;

                                notify.success(`Ruolo aggiornato a: ${newRole}`);
                                
                        } catch (error) {
                                console.error('Error updating user role:', error);
                                notify.error('Errore nell\'aggiornamento del ruolo: ' + error.message);
                                // Reload the users list to reset the dropdown
                                await loadUsersList();
                        }
                }

                async function resendConfirmationToUser(userId) {
                        try {
                                const { error } = await supabaseClient.auth.admin.generateLink({
                                        type: 'signup',
                                        email: userId // This would need the actual email
                                });

                                if (error) throw error;

                                notify.success('Email di conferma inviata!');
                                
                        } catch (error) {
                                console.error('Error resending confirmation:', error);
                                notify.error('Errore nell\'invio della conferma: ' + error.message);
                        }
                }

                async function deleteUser(userId) {
                        if (!confirm('Sei sicuro di voler eliminare questo profilo utente? Questa azione non può essere annullata.')) {
                                return;
                        }

                        try {
                                // Delete user profile from profiles table
                                const { error } = await supabaseClient
                                        .from('profiles')
                                        .delete()
                                        .eq('id', userId);

                                if (error) throw error;

                                notify.success('Profilo utente eliminato con successo!');
                                await loadUsersList();
                                
                        } catch (error) {
                                console.error('Error deleting user profile:', error);
                                notify.error('Errore nell\'eliminazione del profilo: ' + error.message);
                        }
                }

                // Initialize users management when authentication is complete
                async function initializeUsersManagement() {
                        // Load users list when the tab is shown
                        const showUsersBtn = document.getElementById('show-users-list');
                        if (showUsersBtn) {
                                showUsersBtn.addEventListener('click', () => {
                                        loadUsersList();
                                });
                        }

                        // Load users list initially if user has admin privileges
                        if (userRole === 'admin' || userRole === 'socio') {
                                await loadUsersList();
                        }
                }

                // Function to edit user profile
                async function editUserProfile(userId) {
                        try {
                                console.log('Loading profile for ID:', userId);
                                
                                // Get user data using id field only
                                let { data: profile, error } = await supabaseClient
                                        .from('profiles')
                                        .select('*')
                                        .eq('id', userId)
                                        .single();

                                if (error) throw error;
                                
                                console.log('Loaded profile:', profile);

                                // Create a modal or form for editing
                                const modalHTML = `
                                        <div id="edit-user-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                                                <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
                                                        <h3 style="margin-top: 0; color: #333;">Modifica Profilo Utente</h3>
                                                        <form id="edit-user-form">
                                                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Nome *</label>
                                                                                <input type="text" id="edit-user-first-name" value="${profile.first_name || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Cognome *</label>
                                                                                <input type="text" id="edit-user-last-name" value="${profile.last_name || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Email *</label>
                                                                                <input type="email" id="edit-user-email" value="${profile.email || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" required>
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Telefono</label>
                                                                                <input type="tel" id="edit-user-phone" value="${profile.phone_number || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Data di Nascita</label>
                                                                                <input type="date" id="edit-user-birth-date" value="${profile.date_of_birth || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Luogo di Nascita</label>
                                                                                <input type="text" id="edit-user-birth-place" value="${profile.place_of_birth || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Sesso</label>
                                                                                <select id="edit-user-gender" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                                                                        <option value="">Seleziona...</option>
                                                                                        <option value="M" ${profile.gender === 'M' ? 'selected' : ''}>Maschio</option>
                                                                                        <option value="F" ${profile.gender === 'F' ? 'selected' : ''}>Femmina</option>
                                                                                </select>
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Codice Fiscale</label>
                                                                                <input type="text" id="edit-user-fiscal-code" value="${profile.fiscal_code || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; text-transform: uppercase;" maxlength="16">
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Indirizzo</label>
                                                                                <input type="text" id="edit-user-address" value="${profile.address || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Città</label>
                                                                                <input type="text" id="edit-user-city" value="${profile.city || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">CAP</label>
                                                                                <input type="text" id="edit-user-zip" value="${profile.zip_code || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" pattern="[0-9]{5}" maxlength="5">
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Provincia</label>
                                                                                <input type="text" id="edit-user-province" value="${profile.province || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; text-transform: uppercase;" maxlength="2">
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Ruolo</label>
                                                                                <select id="edit-user-role" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                                                                        <option value="utente" ${profile.role === 'utente' ? 'selected' : ''}>Utente</option>
                                                                                        <option value="socio" ${profile.role === 'socio' ? 'selected' : ''}>Socio</option>
                                                                                        <option value="admin" ${profile.role === 'admin' ? 'selected' : ''}>Admin</option>
                                                                                </select>
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Tipo Socio 1</label>
                                                                                <input type="text" id="edit-user-membership1" value="${profile.membership_type1 || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Tipo Socio 2</label>
                                                                                <input type="text" id="edit-user-membership2" value="${profile.membership_type2 || ''}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                                                        </div>
                                                                        <div>
                                                                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Stato Iscrizione</label>
                                                                                <select id="edit-user-status" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                                                                        <option value="attivo" ${(profile.membership_status || '').toLowerCase() === 'attivo' ? 'selected' : ''}>Attivo</option>
                                                                                        <option value="sospeso" ${(profile.membership_status || '').toLowerCase() === 'sospeso' ? 'selected' : ''}>Sospeso</option>
                                                                                        <option value="scaduto" ${(profile.membership_status || '').toLowerCase() === 'scaduto' ? 'selected' : ''}>Scaduto</option>
                                                                                        <option value="cancellato" ${(profile.membership_status || '').toLowerCase() === 'cancellato' ? 'selected' : ''}>Cancellato</option>
                                                                                </select>
                                                                        </div>
                                                                        <div style="grid-column: span 2;">
                                                                                <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                                                                                        <input type="checkbox" id="edit-user-privacy" ${profile.privacy_accepted ? 'checked' : ''}>
                                                                                        <span style="font-weight: bold;">Privacy Accettata</span>
                                                                                </label>
                                                                        </div>
                                                                </div>
                                                                <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                                                                        <button type="button" onclick="closeEditUserModal()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">Annulla</button>
                                                                        <button type="submit" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">💾 Salva Modifiche</button>
                                                                </div>
                                                        </form>
                                                </div>
                                        </div>
                                `;

                                document.body.insertAdjacentHTML('beforeend', modalHTML);

                                // Add form submit handler
                                document.getElementById('edit-user-form').addEventListener('submit', async (e) => {
                                        e.preventDefault();
                                        await saveUserProfile(userId);
                                });

                        } catch (error) {
                                console.error('Error loading user profile:', error);
                                notify.error('Errore nel caricamento del profilo: ' + error.message);
                        }
                }

                async function saveUserProfile(userId) {
                        try {
                                console.log('Updating user profile for ID:', userId);
                                
                const updateData = {
                        first_name: document.getElementById('edit-user-first-name').value,
                        last_name: document.getElementById('edit-user-last-name').value,
                        email: document.getElementById('edit-user-email').value,
                        phone_number: document.getElementById('edit-user-phone').value || null,
                        date_of_birth: document.getElementById('edit-user-birth-date').value || null,
                        place_of_birth: document.getElementById('edit-user-birth-place').value,
                        gender: document.getElementById('edit-user-gender').value,
                        fiscal_code: document.getElementById('edit-user-fiscal-code').value.toUpperCase(),
                        address: document.getElementById('edit-user-address').value,
                        city: document.getElementById('edit-user-city').value,
                        zip_code: document.getElementById('edit-user-zip').value,
                        province: document.getElementById('edit-user-province').value.toUpperCase(),
                        role: document.getElementById('edit-user-role').value,
                        membership_type1: document.getElementById('edit-user-membership1').value,
                        membership_type2: document.getElementById('edit-user-membership2').value,
                        membership_status: document.getElementById('edit-user-status').value, // Values are already lowercase
                        privacy_accepted: document.getElementById('edit-user-privacy').checked
                };                                        // Remove empty values and fields that don't exist in the table
                                Object.keys(updateData).forEach(key => {
                                        if (updateData[key] === '' || updateData[key] === null) {
                                                if (key !== 'date_of_birth') { // Keep null for date_of_birth if empty
                                                        updateData[key] = null;
                                                }
                                        }
                                });

                                console.log('Update data:', updateData);
                                console.log('Current user session:', supabaseClient.auth.getSession());

                                // First verify the user exists and get current data
                                const { data: existingUser, error: checkError } = await supabaseClient
                                        .from('profiles')
                                        .select('*')
                                        .eq('id', userId)
                                        .single();

                                if (checkError || !existingUser) {
                                        console.error('User not found:', checkError);
                                        throw new Error('Utente non trovato nella tabella profiles');
                                }

                                console.log('Current user data:', existingUser);
                                console.log('User exists, proceeding with update...');

                                // Try update with explicit returning all fields
                                const { data, error, status, statusText } = await supabaseClient
                                        .from('profiles')
                                        .update(updateData)
                                        .eq('id', userId)
                                        .select('*');

                                console.log('Update result data:', data);
                                console.log('Update result error:', error);
                                console.log('Update result status:', status);
                                console.log('Update result statusText:', statusText);

                                if (error) {
                                        console.error('Update error details:', error);
                                        throw error;
                                }

                                // If no data returned but no error, try alternative approaches
                                if (!data || data.length === 0) {
                                        console.log('No data returned from update, trying alternative approaches...');
                                        
                                        // Try using upsert instead
                                        console.log('Attempting upsert...');

                                        let upsertData = { ...updateData, id: userId };
                                        const { data: upsertResult, error: upsertError } = await supabaseClient
                                                .from('profiles')
                                                .upsert(upsertData, { onConflict: 'id' })
                                                .select('*');

                                        console.log('Upsert result:', upsertResult);
                                        console.log('Upsert error:', upsertError);
                                        // Logga warning se membership_type2 non coincide
                                        if (upsertResult && upsertResult.length > 0 && upsertData.membership_type2) {
                                            const dbType2 = upsertResult[0].membership_type2;
                                            if (dbType2 && dbType2 !== upsertData.membership_type2) {
                                                console.warn(`ATTENZIONE: membership_type2 inviato='${upsertData.membership_type2}', restituito dal DB='${dbType2}'. Probabile normalizzazione lato database.`);
                                            }
                                        }

                                        if (upsertError) {
                                                console.error('Upsert failed, trying direct query approach...');
                                                
                                                // Last resort: verify if data actually changed
                                                const { data: verifyData, error: verifyError } = await supabaseClient
                                                        .from('profiles')
                                                        .select('*')
                                                        .eq('id', userId)
                                                        .single();

                                                if (verifyError) {
                                                        throw new Error('Errore nella verifica dell\'aggiornamento: ' + verifyError.message);
                                                }

                                                console.log('Comparing data...');
                                                console.log('Original data:', existingUser);
                                                console.log('Current data:', verifyData);
                                                console.log('Expected updates:', updateData);

                                                // Check if data actually changed
                                                let hasChanges = false;
                                                let failedUpdates = [];
                                                
                                                for (const [key, value] of Object.entries(updateData)) {
                                                        // Skip comparison for fields that might not exist in existingUser
                                                        if (!(key in existingUser)) {
                                                                console.log(`Field ${key} not in original data, skipping comparison`);
                                                                continue;
                                                        }
                                                        
                                                        let originalValue = existingUser[key];
                                                        let currentValue = verifyData[key];
                                                        let expectedValue = value;
                                                        
                                                        // Handle case sensitivity for string comparisons
                                                        if (typeof originalValue === 'string' && typeof expectedValue === 'string') {
                                                                originalValue = originalValue.toLowerCase();
                                                                currentValue = currentValue ? currentValue.toLowerCase() : currentValue;
                                                                expectedValue = expectedValue.toLowerCase();
                                                        }
                                                        
                                                        if (originalValue !== expectedValue) {
                                                                hasChanges = true;
                                                                if (currentValue === expectedValue || (expectedValue === null && currentValue === null)) {
                                                                        console.log(`Field ${key} was updated successfully: ${existingUser[key]} -> ${verifyData[key]}`);
                                                                } else {
                                                                        console.log(`Field ${key} was NOT updated: expected ${value}, got ${verifyData[key]}`);
                                                                        failedUpdates.push(key);
                                                                }
                                                        }
                                                }

                                                if (failedUpdates.length > 0) {
                                                        throw new Error(`Campi non aggiornati: ${failedUpdates.join(', ')}. Possibile problema di permessi RLS.`);
                                                }

                                                if (!hasChanges) {
                                                        console.log('No changes were needed - data was already up to date');
                                                }
                                        } else if (upsertResult && upsertResult.length > 0) {
                                                console.log('Upsert successful');
                                        } else {
                                                throw new Error('Nessun metodo di aggiornamento ha funzionato. Controlla i permessi RLS.');
                                        }
                                } else {
                                        console.log('Update successful with returned data:', data);
                                }

                                notify.success('Profilo aggiornato con successo!');
                                closeEditUserModal();
                                await loadUsersList();

                        } catch (error) {
                                console.error('Error updating user profile:', error);
                                notify.error('Errore nell\'aggiornamento: ' + error.message);
                        }
                }

                function closeEditUserModal() {
                        const modal = document.getElementById('edit-user-modal');
                        if (modal) {
                                modal.remove();
                        }
                }

                // Global functions for buttons
                window.resendConfirmation = resendConfirmation;
                window.handleLogout = handleLogout;
                window.updateUserRole = updateUserRole;
                window.resendConfirmationToUser = resendConfirmationToUser;
                window.deleteUser = deleteUser;
                window.editUserProfile = editUserProfile;
                window.closeEditUserModal = closeEditUserModal;