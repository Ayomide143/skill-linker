"use client";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function FreelancerProfile() {
  // Example user data (replace with real data/fetch later)
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    username: "janedoe",
    email: "jane.doe@email.com",
    country: "Nigeria",
    bio: "Experienced Full Stack Developer specializing in React and Node.js. Passionate about building scalable web apps.",
    skills: ["React", "Node.js", "MongoDB", "UI/UX"],
    avatar: "/avatar-placeholder.png",
    hourlyRate: "30",
    testimonials: [
      {
        client: "Acme Corp",
        text: "Jane delivered outstanding work on our project!",
        requested: false,
      },
    ],
    certificates: [
      {
        name: "Full Stack Web Development",
        issuer: "Coursera",
        year: "2023",
      },
    ],
  });

  const [editing, setEditing] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  // Certificate state for adding new certificate
  const [newCertificate, setNewCertificate] = useState({ name: "", issuer: "", year: "" });

  // Testimonial request state
  const [testimonialRequest, setTestimonialRequest] = useState("");

  const handleEdit = () => {
    setEditProfile(profile);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditProfile(profile);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editProfile);
    setEditing(false);
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCertificate.name && newCertificate.issuer && newCertificate.year) {
      setEditProfile({
        ...editProfile,
        certificates: [
          ...(editProfile.certificates || []),
          { ...newCertificate },
        ],
      });
      setNewCertificate({ name: "", issuer: "", year: "" });
    }
  };

  const handleRemoveCertificate = (idx: number) => {
    setEditProfile({
      ...editProfile,
      certificates: (editProfile.certificates || []).filter((_, i) => i !== idx),
    });
  };

  const handleRequestTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (testimonialRequest.trim()) {
      setEditProfile({
        ...editProfile,
        testimonials: [
          ...(editProfile.testimonials || []),
          { client: testimonialRequest, text: "", requested: true },
        ],
      });
      setTestimonialRequest("");
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-2 sm:px-6 py-10 space-y-6">
      {/* Section 1: Profile, Username, About, Skills, Hourly Rate */}
      <div className="bg-white rounded-xl border border-indigo-100 p-6 flex flex-col items-center">
        <div className="relative mb-4">
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-indigo-200 object-cover"
          />
          {editing && (
            <label className="absolute bottom-2 right-2 bg-indigo-600 text-white rounded-full p-2 cursor-pointer shadow hover:bg-indigo-700 transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setEditProfile({
                        ...editProfile,
                        avatar: reader.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 16v-4m0 0V8m0 4h4m-4 0H8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </label>
          )}
        </div>
        {editing ? (
          <form className="w-full max-w-lg space-y-4" onSubmit={handleSave}>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={editProfile.name}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, name: e.target.value })
                  }
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={editProfile.username}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, username: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={editProfile.email}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={editProfile.country}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, country: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Rate ($/hr)
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={editProfile.hourlyRate}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, hourlyRate: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows={3}
                value={editProfile.bio}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, bio: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills (comma separated)
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={editProfile.skills.join(", ")}
                onChange={(e) =>
                  setEditProfile({
                    ...editProfile,
                    skills: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-indigo-700 mb-1">
              {profile.name}
            </h2>
            <p className="text-gray-500 mb-2">@{profile.username}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mb-2">{profile.bio}</p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-2">
              <span>
                <strong>Email:</strong> {profile.email}
              </span>
              <span>
                <strong>Country:</strong> {profile.country}
              </span>
              <span>
                <strong>Hourly Rate:</strong> ${profile.hourlyRate}/hr
              </span>
            </div>
          </>
        )}
      </div>

      {/* Section 2: Certificates */}
      <div className="bg-white rounded-xl border border-indigo-100 p-6 w-full">
        <h3 className="font-semibold text-indigo-700 mb-2">Certificates</h3>
        {editing ? (
          <>
            <ul className="mb-2">
              {(editProfile.certificates || []).map((cert, idx) => (
                <li key={idx} className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{cert.name}</span>
                  <span className="text-xs text-gray-500">
                    ({cert.issuer}, {cert.year})
                  </span>
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700 text-xs"
                    onClick={() => handleRemoveCertificate(idx)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleAddCertificate}>
              <input
                type="text"
                placeholder="Certificate Name"
                className="flex-1 px-2 py-1 border rounded"
                value={newCertificate.name}
                onChange={e => setNewCertificate({ ...newCertificate, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Issuer"
                className="flex-1 px-2 py-1 border rounded"
                value={newCertificate.issuer}
                onChange={e => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
              />
              <input
                type="text"
                placeholder="Year"
                className="w-20 px-2 py-1 border rounded"
                value={newCertificate.year}
                onChange={e => setNewCertificate({ ...newCertificate, year: e.target.value })}
              />
              <button
                type="submit"
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs"
              >
                Add
              </button>
            </form>
          </>
        ) : (
          <ul className="list-disc list-inside text-gray-700 text-sm">
            {(profile.certificates || []).length === 0 && (
              <li className="text-gray-400">No certificates added.</li>
            )}
            {(profile.certificates || []).map((cert, idx) => (
              <li key={idx}>
                <span className="font-medium">{cert.name}</span>{" "}
                <span className="text-xs text-gray-500">
                  ({cert.issuer}, {cert.year})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Section 3: Testimonials */}
      <div className="bg-white rounded-xl border border-indigo-100 p-6 w-full">
        <h3 className="font-semibold text-indigo-700 mb-2">Testimonials</h3>
        {editing ? (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Request Testimonial from Client
            </label>
            <form className="flex gap-2 mb-2" onSubmit={handleRequestTestimonial}>
              <input
                type="text"
                placeholder="Client Name or Email"
                className="flex-1 px-2 py-1 border rounded"
                value={testimonialRequest}
                onChange={e => setTestimonialRequest(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs"
              >
                Request
              </button>
            </form>
            <ul className="mt-2">
              {(editProfile.testimonials || []).map((t, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                  <span className="font-medium">{t.client}</span>
                  {t.requested && <span className="text-indigo-500">(Requested)</span>}
                  {t.text && <span className="italic">"{t.text}"</span>}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ul className="list-disc list-inside text-gray-700 text-sm">
            {(profile.testimonials || []).length === 0 && (
              <li className="text-gray-400">No testimonials yet.</li>
            )}
            {(profile.testimonials || []).map((t, idx) => (
              <li key={idx}>
                <span className="font-medium">{t.client}:</span>{" "}
                {t.text ? (
                  <span className="italic">"{t.text}"</span>
                ) : (
                  <span className="text-indigo-500">(Requested)</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Buttons at the end */}
      <div className="flex justify-end">
        {!editing ? (
          <button
            className="mt-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-600 transition"
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-600 transition"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
}
