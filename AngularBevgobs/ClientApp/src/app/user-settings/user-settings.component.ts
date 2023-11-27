import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})

export class UserSettingsComponent implements OnInit {
  currentUser: any = {
    email: '',
    username: '',
    id: null,
  };
  settingsForm!: FormGroup;
  loading = false;
  errorMessage: string = '';
  successMessage: string = '';
  selectedFile: File | undefined;
  imagePreviewUrl: string | null = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUserDetails(+userId).subscribe({
        next: (user) => {
          this.currentUser = user;
          this.updateFormValues(user);
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }

  private initializeForm() {
    this.settingsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.minLength(8)]]
    });
  }

  private updateFormValues(user: any) {
    this.settingsForm.patchValue({
      email: user.email,
      username: user.username
      // Update other form controls here if needed
    });
  }

  onUpdateSettings() {
    if (this.settingsForm.valid) {
      this.loading = true;

      const formData = new FormData();
      formData.append('id', this.currentUser.id.toString());

      // Append email and username only if they have values
      if (this.settingsForm.value.email) {
        formData.append('email', this.settingsForm.value.email);
      }
      if (this.settingsForm.value.username) {
        formData.append('username', this.settingsForm.value.username);
      }

      // Append password only if it's not empty
      if (this.settingsForm.value.password) {
        formData.append('password', this.settingsForm.value.password);
      }

      // Append the profile picture only if it's selected
      if (this.selectedFile) {
        formData.append('profilePicture', this.selectedFile, this.selectedFile.name);
      }

      this.authService.updateUserDetails(this.currentUser.id, formData).subscribe({
        next: (response) => {
          this.successMessage = 'Update successful!';
          this.fetchUpdatedUserDetails();
        },
        error: (err) => {
          this.errorMessage = 'Error updating user settings: ' + err.message;
          console.error('Error updating user settings:', err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  private fetchUpdatedUserDetails() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUserDetails(+userId).subscribe({
        next: (user) => {
          this.currentUser = user;
          if (this.currentUser.UserPhoto) {
            const blob = new Blob([new Uint8Array(this.currentUser.UserPhoto)], { type: 'image/png' });
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              this.currentUser.UserPhotoBase64 = reader.result as string;
            };
          }
          this.updateFormValues(user);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching updated user details:', err);
          this.loading = false;
        }
      });
    }
  }



  onProfilePictureChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];

      // Create a URL for the selected file
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          this.imagePreviewUrl = fileReader.result as string;
        }
      };
      fileReader.readAsDataURL(this.selectedFile);
    }
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }


}
