// // Initialize profile counter
// let profileCounter = 16;
// const catchDisplay = document.querySelector('#Profile_Counter');
// const profileMarquee = document.getElementById('profileMarquee');

// // Display initial counter
// catchDisplay.innerHTML = `Total Profiles: ${profileCounter}`;

// // Function to update counter
// function updateCounter() {
//     catchDisplay.innerHTML = `Total Profiles: ${profileCounter}`;
// }

// // Function to save profile
// function saveProfile() {
//     // Increment counter
//     profileCounter++;
//     updateCounter();
    
//     // Get the canvas data
//     const canvas = document.getElementById('result-canvas');
//     const dataURL = canvas.toDataURL('image/png');
    
//     // Create container for profile image and ID
//     const profileContainer = document.createElement('div');
//     profileContainer.className = 'profile-container';

//     // Create the image element
//     const newProfileImg = document.createElement('img');
//     newProfileImg.src = dataURL;
//     newProfileImg.alt = `Profile ${profileCounter}`;
//     newProfileImg.className = 'img_profile';

//     // Create ID label
//     const idLabel = document.createElement('div');
//     idLabel.className = 'profile-id';
//     idLabel.textContent = `ID: ${profileCounter}`;

//     // Add elements to container
//     profileContainer.appendChild(newProfileImg);
//     profileContainer.appendChild(idLabel);

//     // Add the new profile to the marquee
//     profileMarquee.appendChild(profileContainer);
    
//     // Trigger download
//     const link = document.createElement('a');
//     link.download = `BT_Profile_${profileCounter}.png`;
//     link.href = dataURL;
//     link.click();
    
//     // Save to localStorage
//     saveToLocalStorage(profileCounter, dataURL);
//     document.querySelector('#download-btn').style.display = "none";
// }

// function saveToLocalStorage(id, dataURL) {
//     const profiles = JSON.parse(localStorage.getItem('savedProfiles') || '{}');
//     profiles[id] = dataURL;
//     localStorage.setItem('savedProfiles', JSON.stringify(profiles));
// }

// // Delete/Hide profile by ID function
// function deleteProfile() {
//     // First verify PIN
//     const get_pin = prompt("Enter PIN to manage profiles:");
    
//     if(get_pin !== "337592") {
//         alert("Wrong PIN. Operation cancelled.");
//         return;
//     }
    
//     alert("PIN Matched");
    
//     // Get all user-added profiles (IDs > 16)
//     const profiles = Array.from(document.querySelectorAll('#profileMarquee .profile-container'))
//         .filter(container => {
//             const img = container.querySelector('img');
//             const match = img.alt.match(/Profile (\d+)/);
//             return match && parseInt(match[1]) > 16;
//         })
//         .map(container => {
//             const img = container.querySelector('img');
//             const id = parseInt(img.alt.match(/Profile (\d+)/)[1]);
//             return { id, element: container };
//         })
//         .sort((a, b) => b.id - a.id); // Sort by ID descending
    
//     if (profiles.length === 0) {
//         alert('No user-added profiles available!');
//         return;
//     }
    
//     // Show available profile IDs and options
//     const availableIds = profiles.map(p => p.id).join(', ');
//     const action = prompt(`Available profile IDs: ${availableIds}\n\nChoose action:\n1. Hide profile\n2. Delete profile permanently\n\nEnter action number (1 or 2):`);
    
//     if (!action) {
//         alert("No action selected. Cancelling.");
//         return;
//     }
    
//     const profileId = prompt(`Enter the profile ID to ${action === '1' ? 'hide' : 'delete'}:`);
    
//     if (!profileId) {
//         alert("No profile ID entered. Cancelling.");
//         return;
//     }
    
//     // Find the requested profile
//     const profileToManage = profiles.find(p => p.id === parseInt(profileId));
    
//     if (!profileToManage) {
//         alert(`Profile ${profileId} not found! Available IDs: ${availableIds}`);
//         return;
//     }
    
//     // Confirm action
//     if (!confirm(`Are you sure you want to ${action === '1' ? 'hide' : 'permanently delete'} Profile ${profileId}?`)) {
//         return;
//     }
    
//     try {
//         const savedProfiles = JSON.parse(localStorage.getItem('savedProfiles') || '{}');
        
//         if (action === '1') {
//             // Hide the profile
//             profileToManage.element.style.display = 'none';
//             profileToManage.element.dataset.hidden = 'true';
            
//             if (savedProfiles[profileId]) {
//                 savedProfiles[profileId] = {
//                     imageData: typeof savedProfiles[profileId] === 'object' ? 
//                               savedProfiles[profileId].imageData : 
//                               savedProfiles[profileId],
//                     hidden: true
//                 };
//                 alert(`Profile ${profileId} has been hidden.`);
//             }
//         } else {
//             // Permanently delete the profile
//             profileToManage.element.remove();
            
//             if (savedProfiles[profileId]) {
//                 delete savedProfiles[profileId];
                
//                 // Update counter to the highest remaining profile number
//                 const remainingIds = Object.keys(savedProfiles).map(Number);
//                 profileCounter = remainingIds.length > 0 ? Math.max(16, ...remainingIds) : 16;
//                 updateCounter();
//                 alert(`Profile ${profileId} has been permanently deleted.`);
//             }
//         }
        
//         localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Operation failed. See console for details.');
//     }
// }

// // Function to load saved profiles with IDs
// function loadSavedProfiles() {
//     const savedProfiles = JSON.parse(localStorage.getItem('savedProfiles') || '{}');
//     const userProfileKeys = Object.keys(savedProfiles)
//         .filter(key => parseInt(key) > 16) // Only user-added profiles
//         .sort((a, b) => parseInt(a) - parseInt(b)); // Sort by ID
    
//     let highestId = 16;
    
//     userProfileKeys.forEach(key => {
//         const profileData = savedProfiles[key];
        
//         // Skip if profile was deleted (null or undefined)
//         if (!profileData) return;
        
//         const isHidden = typeof profileData === 'object' && profileData.hidden;
//         const imageSrc = typeof profileData === 'object' ? profileData.imageData : profileData;
        
//         // Create container for profile image and ID
//         const container = document.createElement('div');
//         container.className = 'profile-container';
        
//         const img = document.createElement('img');
//         img.src = imageSrc;
//         img.alt = `Profile ${key}`;
//         img.className = 'img_profile';
        
//         // Create ID label
//         const idLabel = document.createElement('div');
//         idLabel.className = 'profile-id';
//         idLabel.textContent = `ID: ${key}`;
        
//         container.appendChild(img);
//         container.appendChild(idLabel);
        
//         if (isHidden) {
//             container.style.display = 'none';
//             container.dataset.hidden = 'true';
//         }
        
//         profileMarquee.appendChild(container);
//         highestId = Math.max(highestId, parseInt(key));
//     });
    
//     profileCounter = highestId;
//     updateCounter();
// }

// // Function to show all hidden profiles
// function showAllHiddenProfiles() {
//     const hiddenProfiles = document.querySelectorAll('#profileMarquee .profile-container[data-hidden="true"]');
//     const savedProfiles = JSON.parse(localStorage.getItem('savedProfiles') || '{}');
//     let anyShown = false;
    
//     hiddenProfiles.forEach(container => {
//         const img = container.querySelector('img');
//         const profileId = img.alt.match(/Profile (\d+)/)[1];
//         container.style.display = '';
//         container.removeAttribute('data-hidden');
        
//         if (savedProfiles[profileId]) {
//             savedProfiles[profileId] = typeof savedProfiles[profileId] === 'object' ? 
//                                      savedProfiles[profileId].imageData : 
//                                      savedProfiles[profileId];
//             anyShown = true;
//         }
//     });
    
//     if (anyShown) {
//         localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
//         alert("All hidden profiles have been restored!");
//     } else {
//         alert("No hidden profiles found.");
//     }
// }

// // Image upload and canvas manipulation
// document.addEventListener('DOMContentLoaded', function() {
//     // Load saved profiles
//     loadSavedProfiles();

//     // Profile upload functionality
//     const profileUpload = document.getElementById('profile-upload');
//     const downloadBtn = document.getElementById('download-btn');
//     const canvas = document.getElementById('result-canvas');
//     const ctx = canvas.getContext('2d');
    
//     // Create Palestine flag background
//     function createPalestineFlag() {
//         const flagColors = ['#000000', '#FFFFFF', '#149954'];
//         const flagHeight = canvas.height;
//         const stripeHeight = flagHeight / 3;
        
//         for (let i = 0; i < 3; i++) {
//             ctx.fillStyle = flagColors[i];
//             ctx.fillRect(0, i * stripeHeight, canvas.width, stripeHeight);
//         }
        
//         ctx.fillStyle = '#E4312b';
//         ctx.beginPath();
//         ctx.moveTo(0, 0);
//         ctx.lineTo(0, flagHeight);
//         ctx.lineTo(canvas.width * 0.4, flagHeight / 2);
//         ctx.closePath();
//         ctx.fill();
//     }

//     // Create default blank profile image
//     function createDefaultProfile() {
//         ctx.beginPath();
//         ctx.arc(canvas.width/2, canvas.height/2, 200, 0, Math.PI * 2);
//         ctx.fillStyle = '#ddd';
//         ctx.fill();
//     }

//     // Modified image upload handler with square conversion
//     profileUpload.addEventListener('change', function(e) {
//         const file = e.target.files[0];
//         if (!file) return;
        
//         const reader = new FileReader();
//         reader.onload = function(event) {
//             const img = new Image();
//             img.onload = function() {
//                 // Create temporary canvas to make image square
//                 const tempCanvas = document.createElement('canvas');
//                 const tempCtx = tempCanvas.getContext('2d');
                
//                 // Set temp canvas to square dimensions
//                 const size = Math.max(img.width, img.height);
//                 tempCanvas.width = size;
//                 tempCanvas.height = size;
                
//                 // Draw image centered on square canvas
//                 tempCtx.fillStyle = '#ffffff'; // white background
//                 tempCtx.fillRect(0, 0, size, size);
                
//                 const offsetX = (size - img.width) / 2;
//                 const offsetY = (size - img.height) / 2;
//                 tempCtx.drawImage(img, offsetX, offsetY, img.width, img.height);
                
//                 // Now draw onto main canvas
//                 createPalestineFlag();
//                 const catch_btn = document.querySelector('#download-btn');
//                 catch_btn.style.display = "inline-block";
                
//                 ctx.save();
//                 ctx.beginPath();
//                 ctx.arc(canvas.width/2, canvas.height/2, 200, 0, Math.PI * 2);
//                 ctx.closePath();
//                 ctx.clip();
                
//                 // Draw the squared image
//                 ctx.drawImage(tempCanvas, 
//                               (canvas.width - 400) / 2, 
//                               (canvas.height - 400) / 2, 
//                               400, 400);
//                 ctx.restore();
//             };
//             img.src = event.target.result;
//         };
//         reader.readAsDataURL(file);
//     });

//     // Initialize with Palestine flag and blank profile
//     createPalestineFlag();
//     createDefaultProfile();
    
//     // Admin profile tooltip
//     const profile = document.querySelector('.profile-wrapper');
//     const tooltip = document.querySelector('.profile-tooltip');
    
//     if (profile && tooltip) {
//         profile.addEventListener('mouseenter', function() {
//             tooltip.style.visibility = 'visible';
//             tooltip.style.opacity = '1';
//             profile.style.cursor = "pointer";
//         });
        
//         profile.addEventListener('mouseleave', function() {
//             tooltip.style.visibility = 'hidden';
//             tooltip.style.opacity = '0';
//         });
//     }
// });

// // Add event listener for delete button
// document.getElementById('deleteProfileBtn').addEventListener('click', deleteProfile);

// ========================================================The End============================================================================



// Initialize profile counter
let profileCounter = 16;
const catchDisplay = document.querySelector('#Profile_Counter');
const profileMarquee = document.getElementById('profileMarquee');

// GitHub configuration
const GITHUB_USERNAME = 'bilalkhan48879';
const GITHUB_REPO = 'Palestine-Profiles';
const GITHUB_TOKEN = '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';
const GITHUB_BRANCH = 'main';
const PROFILES_FOLDER = 'profiles'; 

// Display initial counter
catchDisplay.innerHTML = `Total Profiles: ${profileCounter}`;

// Function to update counter
function updateCounter() {
    catchDisplay.innerHTML = `Total Profiles: ${profileCounter}`;
}

// Function to save profile
async function saveProfile() {
    // Increment counter
    profileCounter++;
    updateCounter();
    
    // Get the canvas data
    const canvas = document.getElementById('result-canvas');
    const dataURL = canvas.toDataURL('image/png');
    
    // Create container for profile image and ID
    const profileContainer = document.createElement('div');
    profileContainer.className = 'profile-container';

    // Create the image element
    const newProfileImg = document.createElement('img');
    newProfileImg.src = dataURL;
    newProfileImg.alt = `Profile ${profileCounter}`;
    newProfileImg.className = 'img_profile';

    // Create ID label
    const idLabel = document.createElement('div');
    idLabel.className = 'profile-id';
    idLabel.textContent = `ID: ${profileCounter}`;

    // Add elements to container
    profileContainer.appendChild(newProfileImg);
    profileContainer.appendChild(idLabel);

    // Add the new profile to the marquee
    profileMarquee.appendChild(profileContainer);
    
    // Trigger download
    const link = document.createElement('a');
    link.download = `BT_Profile_${profileCounter}.png`;
    link.href = dataURL;
    link.click();
    
    // Save to GitHub
    try {
        await saveToGitHub(profileCounter, dataURL);
    } catch (error) {
        console.error('Failed to save to GitHub:', error);
        alert('Failed to save to GitHub. See console for details.');
    }
    
    document.querySelector('#download-btn').style.display = "none";
}

async function saveToGitHub(id, dataURL) {
    // Extract base64 data from dataURL
    const base64Data = dataURL.split(',')[1];
    const filename = `${PROFILES_FOLDER}/profile_${id}.png`;
    const commitMessage = `Add profile ${id}`;
    
    // Create or update file in GitHub
    const response = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${filename}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: commitMessage,
                content: base64Data,
                branch: GITHUB_BRANCH,
            }),
        }
    );
    
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
}

// Delete/Hide profile by ID function
async function deleteProfile() {
    // First verify PIN
    const get_pin = prompt("Enter PIN to manage profiles:");
    
    if(get_pin !== "337592") {
        alert("Wrong PIN. Operation cancelled.");
        return;
    }
    
    alert("PIN Matched");
    
    // Get all user-added profiles (IDs > 16)
    const profiles = Array.from(document.querySelectorAll('#profileMarquee .profile-container'))
        .filter(container => {
            const img = container.querySelector('img');
            const match = img.alt.match(/Profile (\d+)/);
            return match && parseInt(match[1]) > 16;
        })
        .map(container => {
            const img = container.querySelector('img');
            const id = parseInt(img.alt.match(/Profile (\d+)/)[1]);
            return { id, element: container };
        })
        .sort((a, b) => b.id - a.id); // Sort by ID descending
    
    if (profiles.length === 0) {
        alert('No user-added profiles available!');
        return;
    }
    
    // Show available profile IDs and options
    const availableIds = profiles.map(p => p.id).join(', ');
    const action = prompt(`Available profile IDs: ${availableIds}\n\nChoose action:\n1. Hide profile\n2. Delete profile permanently\n\nEnter action number (1 or 2):`);
    
    if (!action) {
        alert("No action selected. Cancelling.");
        return;
    }
    
    const profileId = prompt(`Enter the profile ID to ${action === '1' ? 'hide' : 'delete'}:`);
    
    if (!profileId) {
        alert("No profile ID entered. Cancelling.");
        return;
    }
    
    // Find the requested profile
    const profileToManage = profiles.find(p => p.id === parseInt(profileId));
    
    if (!profileToManage) {
        alert(`Profile ${profileId} not found! Available IDs: ${availableIds}`);
        return;
    }
    
    // Confirm action
    if (!confirm(`Are you sure you want to ${action === '1' ? 'hide' : 'permanently delete'} Profile ${profileId}?`)) {
        return;
    }
    
    try {
        if (action === '1') {
            // Hide the profile
            profileToManage.element.style.display = 'none';
            profileToManage.element.dataset.hidden = 'true';
            alert(`Profile ${profileId} has been hidden.`);
        } else {
            // Permanently delete the profile from GitHub
            await deleteFromGitHub(profileId);
            
            // Remove from DOM
            profileToManage.element.remove();
            
            // Update counter to the highest remaining profile number
            const remainingIds = profiles
                .filter(p => p.id !== parseInt(profileId))
                .map(p => p.id);
            
            profileCounter = remainingIds.length > 0 ? Math.max(16, ...remainingIds) : 16;
            updateCounter();
            alert(`Profile ${profileId} has been permanently deleted.`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Operation failed. See console for details.');
    }
}

async function deleteFromGitHub(id) {
    const filename = `${PROFILES_FOLDER}/profile_${id}.png`;
    
    // First get the file SHA (needed for deletion)
    const getResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${filename}`,
        {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
            },
        }
    );
    
    if (!getResponse.ok) {
        throw new Error(`Failed to get file info: ${getResponse.status}`);
    }
    
    const fileInfo = await getResponse.json();
    
    // Then delete the file
    const deleteResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${filename}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Delete profile ${id}`,
                sha: fileInfo.sha,
                branch: GITHUB_BRANCH,
            }),
        }
    );
    
    if (!deleteResponse.ok) {
        throw new Error(`Failed to delete file: ${deleteResponse.status}`);
    }
    
    return await deleteResponse.json();
}

// Function to load saved profiles with IDs
async function loadSavedProfiles() {
    try {
        // Get list of all profile files in the GitHub repo
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${PROFILES_FOLDER}`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                },
            }
        );
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const files = await response.json();
        
        // Filter and sort profile files
        const profileFiles = files
            .filter(file => file.name.startsWith('profile_') && file.name.endsWith('.png'))
            .map(file => {
                const id = parseInt(file.name.match(/profile_(\d+)\.png/)[1]);
                return { id, download_url: file.download_url };
            })
            .sort((a, b) => a.id - b.id);
        
        let highestId = 16;
        
        // Load each profile
        for (const file of profileFiles) {
            const profileResponse = await fetch(file.download_url);
            if (!profileResponse.ok) continue;
            
            const blob = await profileResponse.blob();
            const dataURL = await new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
            
            // Create container for profile image and ID
            const container = document.createElement('div');
            container.className = 'profile-container';
            
            const img = document.createElement('img');
            img.src = dataURL;
            img.alt = `Profile ${file.id}`;
            img.className = 'img_profile';
            
            // Create ID label
            const idLabel = document.createElement('div');
            idLabel.className = 'profile-id';
            idLabel.textContent = `ID: ${file.id}`;
            
            container.appendChild(img);
            container.appendChild(idLabel);
            
            profileMarquee.appendChild(container);
            highestId = Math.max(highestId, file.id);
        }
        
        profileCounter = highestId;
        updateCounter();
    } catch (error) {
        console.error('Failed to load profiles from GitHub:', error);
        alert('Failed to load profiles from GitHub. See console for details.');
    }
}

// Function to show all hidden profiles
function showAllHiddenProfiles() {
    const hiddenProfiles = document.querySelectorAll('#profileMarquee .profile-container[data-hidden="true"]');
    let anyShown = false;
    
    hiddenProfiles.forEach(container => {
        container.style.display = '';
        container.removeAttribute('data-hidden');
        anyShown = true;
    });
    
    if (anyShown) {
        alert("All hidden profiles have been restored!");
    } else {
        alert("No hidden profiles found.");
    }
}

// Image upload and canvas manipulation
document.addEventListener('DOMContentLoaded', function() {
    // Load saved profiles
    loadSavedProfiles();

    // Profile upload functionality
    const profileUpload = document.getElementById('profile-upload');
    const downloadBtn = document.getElementById('download-btn');
    const canvas = document.getElementById('result-canvas');
    const ctx = canvas.getContext('2d');
    
    // Create Palestine flag background
    function createPalestineFlag() {
        const flagColors = ['#000000', '#FFFFFF', '#149954'];
        const flagHeight = canvas.height;
        const stripeHeight = flagHeight / 3;
        
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = flagColors[i];
            ctx.fillRect(0, i * stripeHeight, canvas.width, stripeHeight);
        }
        
        ctx.fillStyle = '#E4312b';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, flagHeight);
        ctx.lineTo(canvas.width * 0.4, flagHeight / 2);
        ctx.closePath();
        ctx.fill();
    }

    // Create default blank profile image
    function createDefaultProfile() {
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 200, 0, Math.PI * 2);
        ctx.fillStyle = '#ddd';
        ctx.fill();
    }

    // Modified image upload handler with square conversion
    profileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                // Create temporary canvas to make image square
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                
                // Set temp canvas to square dimensions
                const size = Math.max(img.width, img.height);
                tempCanvas.width = size;
                tempCanvas.height = size;
                
                // Draw image centered on square canvas
                tempCtx.fillStyle = '#ffffff'; // white background
                tempCtx.fillRect(0, 0, size, size);
                
                const offsetX = (size - img.width) / 2;
                const offsetY = (size - img.height) / 2;
                tempCtx.drawImage(img, offsetX, offsetY, img.width, img.height);
                
                // Now draw onto main canvas
                createPalestineFlag();
                const catch_btn = document.querySelector('#download-btn');
                catch_btn.style.display = "inline-block";
                
                ctx.save();
                ctx.beginPath();
                ctx.arc(canvas.width/2, canvas.height/2, 200, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
                
                // Draw the squared image
                ctx.drawImage(tempCanvas, 
                              (canvas.width - 400) / 2, 
                              (canvas.height - 400) / 2, 
                              400, 400);
                ctx.restore();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    // Initialize with Palestine flag and blank profile
    createPalestineFlag();
    createDefaultProfile();
    
    // Admin profile tooltip
    const profile = document.querySelector('.profile-wrapper');
    const tooltip = document.querySelector('.profile-tooltip');
    
    if (profile && tooltip) {
        profile.addEventListener('mouseenter', function() {
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
            profile.style.cursor = "pointer";
        });
        
        profile.addEventListener('mouseleave', function() {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        });
    }
});

// Add event listener for delete button
document.getElementById('deleteProfileBtn').addEventListener('click', deleteProfile);
