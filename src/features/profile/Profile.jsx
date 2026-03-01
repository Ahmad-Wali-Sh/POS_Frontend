import { Card, Avatar, Form, Input, Button, Descriptions, message } from "antd";
import { UserOutlined, EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import useUser from "../store/auth/useUser";
import useEmployees from "../store/auth/useEmployees";

function Profile() {
    const { user, setUser } = useUser();
    const { updateEmployee } = useEmployees();

    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (user?.id) {
            form.setFieldsValue(user);
        }
    }, [user]);

    const handleSave = (values) => {
        const updatedUser = { ...user, ...values };
        updateEmployee(user.id, updatedUser);
        setUser(updatedUser);
        setEditMode(false);
        message.success("Profile Updated Successfully");
    };

    return (
        <main className="w-full h-full bg-gray-100 p-6">
            <Card
                className="w-full h-full rounded-2xl shadow-xl"
                title={
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold">My Profile</span>

                        {!editMode ? (
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => setEditMode(true)}
                            >
                                Edit Profile
                            </Button>
                        ) : (
                            <Button
                                danger
                                icon={<CloseOutlined />}
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                }
            >
                <div className="flex flex-col items-center mb-8">
                    <Avatar
                        size={140}
                        src={user?.photo}
                        icon={<UserOutlined />}
                        className="shadow-lg"
                    />
                    <h2 className="text-2xl font-bold mt-4">{user?.fullname}</h2>
                    <span className="text-gray-500">{user?.position}</span>
                </div>

                {!editMode ? (
                    <Descriptions
                        bordered
                        column={1}
                        size="middle"
                    >
                        <Descriptions.Item label="Username">
                            {user?.username}
                        </Descriptions.Item>

                        <Descriptions.Item label="Full Name">
                            {user?.fullname}
                        </Descriptions.Item>

                        <Descriptions.Item label="Age">
                            {user?.age}
                        </Descriptions.Item>

                        <Descriptions.Item label="Position">
                            {user?.position}
                        </Descriptions.Item>
                    </Descriptions>
                ) : (
                    <>
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={handleSave}
                            className="grid grid-cols-2 gap-3"
                        >
                            <Form.Item label="Username" name="username">
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                label="Full Name"
                                name="fullname"
                                rules={[{ required: true, message: "Full name is required" }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="Age" name="age">
                                <Input type="number" />
                            </Form.Item>

                            <Form.Item label="Photo URL" name="photo">
                                <Input />
                            </Form.Item>
                        </Form>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                className="w-full rounded-xl"
                                onClick={handleSave}
                            >
                                Save Changes
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Card>
        </main>
    );
}

export default Profile;