import React, { useRef, useState, useEffect } from 'react';
import { register_base, useAuth, login_google, storage } from '../firebase'
import { getDatabase, ref, onValue, set, runTransaction } from "firebase/database";
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import { BadgeCheckIcon } from '@heroicons/react/outline';
import { unstable_composeClasses } from '@mui/material';
import { getAuth, onAuthStateChanged } from "firebase/auth";



export default function Profile() {
    const [selectedFile, setSelectedFile] = useState();
    const [selected, setIsSelected] = useState(false);


    const [selectedFile1, setSelectedFile1] = useState();
    const [selected1, setIsSelected1] = useState(false);

    const [userInfoFromData, setuserInfoFromData] = useState([]);

    const aboutRef = useRef()
    const cityRef = useRef()
    const countryRef = useRef()
    const coverPicRef = selectedFile1;
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const profilePicRef = selectedFile1;
    const stateRef = useRef()
    const streetAdressRef = useRef()
    const zipRef = useRef()
    const auth = useAuth();

    useEffect(() => {

        console.log(getAuth().currentUser.uid);
        const db = getDatabase();
        const starCountRef = ref(db, 'users/' + getAuth().currentUser.uid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });

    }, [])


    const changeHandler = (event) => {
        console.log(event.target.files[0])
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const changeHandler1 = (event) => {
        console.log(event.target.files[0])
        setSelectedFile1(event.target.files[0]);
        setIsSelected1(true);
    };

    async function editUserInfo(e) {
        e.preventDefault()
        const db = getDatabase();
        const postRef = ref(db, 'users/' + getAuth().currentUser.uid);
        const imagesRef1 = storageRef(storage, 'images' + "/users" + "/" + getAuth().currentUser.uid + "/1/" + postRef.key);
        const imagesRef2 = storageRef(storage, 'images' + "/users" + "/" + getAuth().currentUser.uid + "/2/" + postRef.key);

        runTransaction(postRef, (currentData) => {
            if (currentData == null) {
                console.log("User Does not Exists");
            }
            else {



                console.log("User Exists");
                currentData.firstname = firstNameRef.current.value;
                currentData.lastname = lastNameRef.current.value;
                currentData.country = countryRef.current.value;
                currentData.streeAdress = streetAdressRef.current.value;
                currentData.city = cityRef.current.value;
                currentData.state = stateRef.current.value;
                currentData.zip = zipRef.current.value;
                currentData.about = aboutRef.current.value;
                console.log(currentData)
                if (selected) {
                    uploadBytes(imagesRef1, selectedFile).then(() => {
                        currentData.profilePic = imagesRef1.fullPath;
                        set(postRef, currentData);
                    });

                };

                if (selected1) {

                    uploadBytes(imagesRef2, selectedFile1).then(() => {
                        currentData.coverPic = imagesRef2.fullPath;
                        set(postRef, currentData);
                    });

                };
            }

            return currentData;
        })
        window.location.href = "/posts"
    }

    // function readingFromDataBase() {
    //     const db = getDatabase();
    //     console.log(getAuth().currentUser);
    //     const auth = getAuth();
    //     const user = auth.currentUser;

    //     // while () {
    //     //     console.log("Waiting for the auth to intialize")
    //     // }

    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             console.log(user.uid)

    //             const starCountRef = ref(db, 'users/' + user.uid);
    //             //console.log(starCountRef);
    //             onValue(starCountRef, (snapshot) => {
    //                 const data = snapshot.val();
    //                 console.log(data);
    //                 updateInfoDatabase(data); 
    //                 return data;         
    //             });
    //         } else {
    //             console.log("Auth is intializing");
    //         }
    //       });
    // }

    // const databaseinfo = [];
    // function updateInfoDatabase(data) {
    //     const datatemp = data;
    //     //console.log("datatemp", datatemp);
    //     //console.log(data);

    //     // data.forEach((values) => {
    //     //     databaseinfo.push(values);
    //     // })
    //     databaseinfo.push(datatemp);

    // }
    // readingFromDataBase().then(() => {
    //     console.log(databaseinfo[0]); 
    // });



    //console.log(getAuth().currentUser)
    return (
        <>
            <div>
                <div className="mt-10 sm:mt-0 mb-32">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate text-center mt-20 ">Account Information </h1>
                    <p className="text-center mb-10 text-greenish5"> Update your account informaition and add cover and profile photos</p>
                    <div className="md:grid md:grid-cols-2 md:gap-6">
                        <div className="mt-5 mx-auto mb-3 md:mt-0 md:col-span-2">
                            <form onSubmit={editUserInfo}>
                                <div className=" overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    First name
                                                </label>
                                                <input

                                                    ref={firstNameRef}
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-1 focus:ring-blueish5 focus:border-blueish5 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                    Last name
                                                </label>
                                                <input
                                                    ref={lastNameRef}
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="mt-1 focus:ring-blueish5 focus:border-blueish5 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Country
                                                </label>
                                                <select
                                                    ref={countryRef}
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blueish5 focus:border-blueish5 sm:text-sm"
                                                >
                                                    <option value="Afganistan">Afghanistan</option>
                                                    <option value="Albania">Albania</option>
                                                    <option value="Algeria">Algeria</option>
                                                    <option value="American Samoa">American Samoa</option>
                                                    <option value="Andorra">Andorra</option>
                                                    <option value="Angola">Angola</option>
                                                    <option value="Anguilla">Anguilla</option>
                                                    <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                                                    <option value="Argentina">Argentina</option>
                                                    <option value="Armenia">Armenia</option>
                                                    <option value="Aruba">Aruba</option>
                                                    <option value="Australia">Australia</option>
                                                    <option value="Austria">Austria</option>
                                                    <option value="Azerbaijan">Azerbaijan</option>
                                                    <option value="Bahamas">Bahamas</option>
                                                    <option value="Bahrain">Bahrain</option>
                                                    <option value="Bangladesh">Bangladesh</option>
                                                    <option value="Barbados">Barbados</option>
                                                    <option value="Belarus">Belarus</option>
                                                    <option value="Belgium">Belgium</option>
                                                    <option value="Belize">Belize</option>
                                                    <option value="Benin">Benin</option>
                                                    <option value="Bermuda">Bermuda</option>
                                                    <option value="Bhutan">Bhutan</option>
                                                    <option value="Bolivia">Bolivia</option>
                                                    <option value="Bonaire">Bonaire</option>
                                                    <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                                    <option value="Botswana">Botswana</option>
                                                    <option value="Brazil">Brazil</option>
                                                    <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                                    <option value="Brunei">Brunei</option>
                                                    <option value="Bulgaria">Bulgaria</option>
                                                    <option value="Burkina Faso">Burkina Faso</option>
                                                    <option value="Burundi">Burundi</option>
                                                    <option value="Cambodia">Cambodia</option>
                                                    <option value="Cameroon">Cameroon</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="Canary Islands">Canary Islands</option>
                                                    <option value="Cape Verde">Cape Verde</option>
                                                    <option value="Cayman Islands">Cayman Islands</option>
                                                    <option value="Central African Republic">Central African Republic</option>
                                                    <option value="Chad">Chad</option>
                                                    <option value="Channel Islands">Channel Islands</option>
                                                    <option value="Chile">Chile</option>
                                                    <option value="China">China</option>
                                                    <option value="Christmas Island">Christmas Island</option>
                                                    <option value="Cocos Island">Cocos Island</option>
                                                    <option value="Colombia">Colombia</option>
                                                    <option value="Comoros">Comoros</option>
                                                    <option value="Congo">Congo</option>
                                                    <option value="Cook Islands">Cook Islands</option>
                                                    <option value="Costa Rica">Costa Rica</option>
                                                    <option value="Cote DIvoire">Cote DIvoire</option>
                                                    <option value="Croatia">Croatia</option>
                                                    <option value="Cuba">Cuba</option>
                                                    <option value="Curaco">Curacao</option>
                                                    <option value="Cyprus">Cyprus</option>
                                                    <option value="Czech Republic">Czech Republic</option>
                                                    <option value="Denmark">Denmark</option>
                                                    <option value="Djibouti">Djibouti</option>
                                                    <option value="Dominica">Dominica</option>
                                                    <option value="Dominican Republic">Dominican Republic</option>
                                                    <option value="East Timor">East Timor</option>
                                                    <option value="Ecuador">Ecuador</option>
                                                    <option value="Egypt">Egypt</option>
                                                    <option value="El Salvador">El Salvador</option>
                                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                    <option value="Eritrea">Eritrea</option>
                                                    <option value="Estonia">Estonia</option>
                                                    <option value="Ethiopia">Ethiopia</option>
                                                    <option value="Falkland Islands">Falkland Islands</option>
                                                    <option value="Faroe Islands">Faroe Islands</option>
                                                    <option value="Fiji">Fiji</option>
                                                    <option value="Finland">Finland</option>
                                                    <option value="France">France</option>
                                                    <option value="French Guiana">French Guiana</option>
                                                    <option value="French Polynesia">French Polynesia</option>
                                                    <option value="French Southern Ter">French Southern Ter</option>
                                                    <option value="Gabon">Gabon</option>
                                                    <option value="Gambia">Gambia</option>
                                                    <option value="Georgia">Georgia</option>
                                                    <option value="Germany">Germany</option>
                                                    <option value="Ghana">Ghana</option>
                                                    <option value="Gibraltar">Gibraltar</option>
                                                    <option value="Great Britain">Great Britain</option>
                                                    <option value="Greece">Greece</option>
                                                    <option value="Greenland">Greenland</option>
                                                    <option value="Grenada">Grenada</option>
                                                    <option value="Guadeloupe">Guadeloupe</option>
                                                    <option value="Guam">Guam</option>
                                                    <option value="Guatemala">Guatemala</option>
                                                    <option value="Guinea">Guinea</option>
                                                    <option value="Guyana">Guyana</option>
                                                    <option value="Haiti">Haiti</option>
                                                    <option value="Hawaii">Hawaii</option>
                                                    <option value="Honduras">Honduras</option>
                                                    <option value="Hong Kong">Hong Kong</option>
                                                    <option value="Hungary">Hungary</option>
                                                    <option value="Iceland">Iceland</option>
                                                    <option value="Indonesia">Indonesia</option>
                                                    <option value="India">India</option>
                                                    <option value="Iran">Iran</option>
                                                    <option value="Iraq">Iraq</option>
                                                    <option value="Ireland">Ireland</option>
                                                    <option value="Isle of Man">Isle of Man</option>
                                                    <option value="Israel">Israel</option>
                                                    <option value="Italy">Italy</option>
                                                    <option value="Jamaica">Jamaica</option>
                                                    <option value="Japan">Japan</option>
                                                    <option value="Jordan">Jordan</option>
                                                    <option value="Kazakhstan">Kazakhstan</option>
                                                    <option value="Kenya">Kenya</option>
                                                    <option value="Kiribati">Kiribati</option>
                                                    <option value="Korea North">Korea North</option>
                                                    <option value="Korea Sout">Korea South</option>
                                                    <option value="Kuwait">Kuwait</option>
                                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                    <option value="Laos">Laos</option>
                                                    <option value="Latvia">Latvia</option>
                                                    <option value="Lebanon">Lebanon</option>
                                                    <option value="Lesotho">Lesotho</option>
                                                    <option value="Liberia">Liberia</option>
                                                    <option value="Libya">Libya</option>
                                                    <option value="Liechtenstein">Liechtenstein</option>
                                                    <option value="Lithuania">Lithuania</option>
                                                    <option value="Luxembourg">Luxembourg</option>
                                                    <option value="Macau">Macau</option>
                                                    <option value="Macedonia">Macedonia</option>
                                                    <option value="Madagascar">Madagascar</option>
                                                    <option value="Malaysia">Malaysia</option>
                                                    <option value="Malawi">Malawi</option>
                                                    <option value="Maldives">Maldives</option>
                                                    <option value="Mali">Mali</option>
                                                    <option value="Malta">Malta</option>
                                                    <option value="Marshall Islands">Marshall Islands</option>
                                                    <option value="Martinique">Martinique</option>
                                                    <option value="Mauritania">Mauritania</option>
                                                    <option value="Mauritius">Mauritius</option>
                                                    <option value="Mayotte">Mayotte</option>
                                                    <option value="Mexico">Mexico</option>
                                                    <option value="Midway Islands">Midway Islands</option>
                                                    <option value="Moldova">Moldova</option>
                                                    <option value="Monaco">Monaco</option>
                                                    <option value="Mongolia">Mongolia</option>
                                                    <option value="Montserrat">Montserrat</option>
                                                    <option value="Morocco">Morocco</option>
                                                    <option value="Mozambique">Mozambique</option>
                                                    <option value="Myanmar">Myanmar</option>
                                                    <option value="Nambia">Nambia</option>
                                                    <option value="Nauru">Nauru</option>
                                                    <option value="Nepal">Nepal</option>
                                                    <option value="Netherland Antilles">Netherland Antilles</option>
                                                    <option value="Netherlands">Netherlands (Holland, Europe)</option>
                                                    <option value="Nevis">Nevis</option>
                                                    <option value="New Caledonia">New Caledonia</option>
                                                    <option value="New Zealand">New Zealand</option>
                                                    <option value="Nicaragua">Nicaragua</option>
                                                    <option value="Niger">Niger</option>
                                                    <option value="Nigeria">Nigeria</option>
                                                    <option value="Niue">Niue</option>
                                                    <option value="Norfolk Island">Norfolk Island</option>
                                                    <option value="Norway">Norway</option>
                                                    <option value="Oman">Oman</option>
                                                    <option value="Pakistan">Pakistan</option>
                                                    <option value="Palau Island">Palau Island</option>
                                                    <option value="Palestine">Palestine</option>
                                                    <option value="Panama">Panama</option>
                                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                                    <option value="Paraguay">Paraguay</option>
                                                    <option value="Peru">Peru</option>
                                                    <option value="Phillipines">Philippines</option>
                                                    <option value="Pitcairn Island">Pitcairn Island</option>
                                                    <option value="Poland">Poland</option>
                                                    <option value="Portugal">Portugal</option>
                                                    <option value="Puerto Rico">Puerto Rico</option>
                                                    <option value="Qatar">Qatar</option>
                                                    <option value="Republic of Montenegro">Republic of Montenegro</option>
                                                    <option value="Republic of Serbia">Republic of Serbia</option>
                                                    <option value="Reunion">Reunion</option>
                                                    <option value="Romania">Romania</option>
                                                    <option value="Russia">Russia</option>
                                                    <option value="Rwanda">Rwanda</option>
                                                    <option value="St Barthelemy">St Barthelemy</option>
                                                    <option value="St Eustatius">St Eustatius</option>
                                                    <option value="St Helena">St Helena</option>
                                                    <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                                                    <option value="St Lucia">St Lucia</option>
                                                    <option value="St Maarten">St Maarten</option>
                                                    <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                                                    <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                                                    <option value="Saipan">Saipan</option>
                                                    <option value="Samoa">Samoa</option>
                                                    <option value="Samoa American">Samoa American</option>
                                                    <option value="San Marino">San Marino</option>
                                                    <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                                    <option value="Senegal">Senegal</option>
                                                    <option value="Seychelles">Seychelles</option>
                                                    <option value="Sierra Leone">Sierra Leone</option>
                                                    <option value="Singapore">Singapore</option>
                                                    <option value="Slovakia">Slovakia</option>
                                                    <option value="Slovenia">Slovenia</option>
                                                    <option value="Solomon Islands">Solomon Islands</option>
                                                    <option value="Somalia">Somalia</option>
                                                    <option value="South Africa">South Africa</option>
                                                    <option value="Spain">Spain</option>
                                                    <option value="Sri Lanka">Sri Lanka</option>
                                                    <option value="Sudan">Sudan</option>
                                                    <option value="Suriname">Suriname</option>
                                                    <option value="Swaziland">Swaziland</option>
                                                    <option value="Sweden">Sweden</option>
                                                    <option value="Switzerland">Switzerland</option>
                                                    <option value="Syria">Syria</option>
                                                    <option value="Tahiti">Tahiti</option>
                                                    <option value="Taiwan">Taiwan</option>
                                                    <option value="Tajikistan">Tajikistan</option>
                                                    <option value="Tanzania">Tanzania</option>
                                                    <option value="Thailand">Thailand</option>
                                                    <option value="Togo">Togo</option>
                                                    <option value="Tokelau">Tokelau</option>
                                                    <option value="Tonga">Tonga</option>
                                                    <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                                                    <option value="Tunisia">Tunisia</option>
                                                    <option value="Turkey">Turkey</option>
                                                    <option value="Turkmenistan">Turkmenistan</option>
                                                    <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                                                    <option value="Tuvalu">Tuvalu</option>
                                                    <option value="Uganda">Uganda</option>
                                                    <option value="United Kingdom">United Kingdom</option>
                                                    <option value="Ukraine">Ukraine</option>
                                                    <option value="United Arab Erimates">United Arab Emirates</option>
                                                    <option value="United States of America">United States of America</option>
                                                    <option value="Uraguay">Uruguay</option>
                                                    <option value="Uzbekistan">Uzbekistan</option>
                                                    <option value="Vanuatu">Vanuatu</option>
                                                    <option value="Vatican City State">Vatican City State</option>
                                                    <option value="Venezuela">Venezuela</option>
                                                    <option value="Vietnam">Vietnam</option>
                                                    <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                                                    <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                                                    <option value="Wake Island">Wake Island</option>
                                                    <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                                                    <option value="Yemen">Yemen</option>
                                                    <option value="Zaire">Zaire</option>
                                                    <option value="Zambia">Zambia</option>
                                                    <option value="Zimbabwe">Zimbabwe</option>
                                                </select>
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                    Street address
                                                </label>
                                                <input
                                                    ref={streetAdressRef}
                                                    type="text"
                                                    name="street-address"
                                                    id="street-address"
                                                    autoComplete="street-address"
                                                    className="mt-1 focus:ring-blueish5 focus:border-blueish5 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                    City
                                                </label>
                                                <input
                                                    ref={cityRef}
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    autoComplete="address-level2"
                                                    className="mt-1 focus:ring-blueish5 focus:border-blueish5 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                                    State / Province
                                                </label>
                                                <input
                                                    ref={stateRef}
                                                    type="text"
                                                    name="region"
                                                    id="region"
                                                    autoComplete="address-level1"
                                                    className="mt-1 focus:ring-blueish5 focus:border-blueish5 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                                    ZIP / Postal code
                                                </label>
                                                <input
                                                    ref={zipRef}
                                                    type="text"
                                                    name="postal-code"
                                                    id="postal-code"
                                                    autoComplete="postal-code"
                                                    className="mt-1 focus:ring-blueish5 focus:border-blueish5 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div>
                                            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                                About
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    ref={aboutRef}
                                                    id="about"
                                                    name="about"
                                                    rows={3}
                                                    className="shadow-sm focus:ring-blueish5 focus:border-blueish5 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="you@example.com"
                                                    defaultValue={''}
                                                />
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Brief description for your profile. URLs are hyperlinked.
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                                            <div className="border border-dashed rounded-xl mt-1 border-gray-500 relative">
                                                <input id="file-upload" name="file-upload" type="file" multiple className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" onChange={changeHandler} />
                                                {selected ?
                                                    <div className="text-center p-20 absolute top-0 right-0 left-0 m-auto flex justify-center items-center">

                                                        <BadgeCheckIcon className='h-7 mr-1' />
                                                        <span className="">Selected</span>
                                                    </div> : <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">

                                                        <div className="space-y-1 text-center">
                                                            <svg
                                                                className="mx-auto h-12 w-12 text-gray-400"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                viewBox="0 0 48 48"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <h4>
                                                            Drop files anywhere to upload
                                                            <br />or
                                                        </h4>
                                                        <p className="">Select Files</p>
                                                    </div>}
                                            </div>

                                            <div>
                                                <label className="mt-5 block text-sm font-medium text-gray-700">Dashboard Cover Photo</label>
                                                <div className="border border-dashed rounded-xl mt-1 border-gray-500 relative">
                                                    <input id="file-upload" name="file-upload" type="file" multiple className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" onChange={changeHandler1} />
                                                    {selected1 ?
                                                        <div className="text-center p-20 absolute top-0 right-0 left-0 m-auto flex justify-center items-center">

                                                            <BadgeCheckIcon className='h-7 mr-1' />
                                                            <span className="">Selected</span>
                                                        </div> : <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">

                                                            <div className="space-y-1 text-center">
                                                                <svg
                                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    viewBox="0 0 48 48"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path
                                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <h4>
                                                                Drop files anywhere to upload
                                                                <br />or
                                                            </h4>
                                                            <p className="">Select Files</p>
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <div className="overflow-hidden sm:rounded-md">

                                    <div className="px-4 py-3 bg-gray-50 rounded-t-md text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blueish6 hover:bg-blueish7 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueish5"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
