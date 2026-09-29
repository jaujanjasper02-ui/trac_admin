import React, { useState } from 'react';

const getInitials = (name) => name
  ?.trim()
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(part => part[0].toUpperCase())
  .join('') || '?';

const StudentAvatar = ({ name, src, size = 'sm' }) => {
  const [failedSrc, setFailedSrc] = useState(null);
  const dimensions = size === 'md' ? 'h-14 w-14 text-sm' : 'h-9 w-9 text-xs';
  const showImage = Boolean(src && src !== failedSrc);

  return (
    <span className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-emerald-50 font-semibold text-[#1B5E20] ${dimensions}`}>
      {showImage ? (
        <img
          src={src}
          alt={`${name || 'Student'} profile`}
          onError={() => setFailedSrc(src)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span role="img" aria-label={`${name || 'Student'} initials`}>
          {getInitials(name || '')}
        </span>
      )}
    </span>
  );
};

export default StudentAvatar;