export interface IPacker {
    packer_id: string;
    packer_type: string;
    packer_group: string;
    packer_UPH: string;
}

export interface ISOT {
    SOT: string;
    package_name: string;
    package_width: number;
    package_length: number;
    package_thickness: number;
    package_cwidth: number;
}

export interface IPartList {
    partlist_id: number;
    packer_id: string;
    sot_id: string;
    part: any;
}

export interface IConvert {
    packer_id: string;
    sot_id: string;
    user_id: string;
    part: any;
}

export interface IConvertDetail {
    convert_id: string;
    partdata_id: string;
}

export interface IUser {
    user_id: string;
    user_name: string;
    user_image: string;
}

export interface IPartData {
    partdata_id: string;
    partdata_name: string;
    part_id: number;
    status: string;
    location: string;
    time_base: number;
    time_use: number;
    counter_base: number;
    counter_use: number;
    convert_id: string;
    user_id: string;
    PM_date: string;
}

export interface IPart {
    part_id: number;
    part_name: string;
    part_image: string;
}

export interface ILocation {
    location_id: string;
    location_type: string;
    rack_id: string;
    row: number;
    column: number;
    empty: boolean;
    location_description: string;
}

