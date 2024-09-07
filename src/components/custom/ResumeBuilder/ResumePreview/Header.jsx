

const Header = ({name, email, addedAdditionalDetails }) => {
     return (
          <header className="mb-4 mt-4 flex justify-between items-center">
               <h5 className="text-xs font-bold text-black leading-tight">{name}</h5>
               <div className="text-black font-semibold leading-tight flex items-center gap-3 text-xs">
                    <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                    <span>{addedAdditionalDetails.phoneNumber}</span>
                    <a href={`https://${addedAdditionalDetails.linkedInProfileLink.replace(/^(https?:\/\/)?/, '')}`} className="text-blue-800 hover:underline" target="_blank" rel="noopener noreferrer">
                         LinkedIn
                    </a>
                    <a href={`https://${addedAdditionalDetails.githubLink.replace(/^(https?:\/\/)?/, '')}`} className="text-blue-800 hover:underline" target="_blank" rel="noopener noreferrer">
                         GitHub
                    </a>
               </div>
          </header>
     )
}

export default Header;